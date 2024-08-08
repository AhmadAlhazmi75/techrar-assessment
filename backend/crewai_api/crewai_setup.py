import os
from pathlib import Path
from typing import Dict
from crewai import Agent, Task, Crew
from crewai_tools import PDFSearchTool
from openai import OpenAI

# Initialize OpenAI client with API key from environment variables
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Mapping of system names to their respective PDF documentation paths
SYSTEM_PDF_MAP: Dict[str, Path] = {
    "system1": Path('media/system1_documentation.pdf'),
    "system2": Path('media/system2_documentation.pdf'),
}

# Mapping of system names to their respective filenames
SYSTEM_FILENAME_MAP: Dict[str, str] = {
    "system1": "DO THE WORK BOOK",
    "system2": "DJANGO REST FRAMEWORK BOOK",
}

# Initialize PDF search tools for each system if the PDF file exists
PDF_SEARCH_TOOLS = {
    system: PDFSearchTool(pdf=str(path))
    for system, path in SYSTEM_PDF_MAP.items()
    if path.exists()
}

def create_crew(system: str, prompt: str) -> Crew:
    """
    Create a Crew instance for analyzing system documentation.

    Args:
        system (str): The system name to analyze.
        prompt (str): The prompt or question to analyze.

    Returns:
        Crew: The Crew instance configured for the specified system.

    Raises:
        ValueError: If the system is not valid.
        FileNotFoundError: If the PDF file for the system does not exist.
    """
    if system not in SYSTEM_PDF_MAP:
        raise ValueError(f"Invalid system: {system}")

    pdf_path = SYSTEM_PDF_MAP[system]
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF file not found for system {system} at {pdf_path.absolute()}")

    # Initialize PDFSearchTool with the specific PDF path
    pdf_search_tool = PDFSearchTool(pdf=str(pdf_path))

    analyst_agent = Agent(
        role=f'{SYSTEM_FILENAME_MAP[system].capitalize()} Documentation Analyst',
        goal=f'Efficiently analyze the {SYSTEM_FILENAME_MAP[system]} documentation and provide accurate, summarized answers based solely on the documentation',
        backstory=f'You are an expert at quickly understanding and interpreting {SYSTEM_FILENAME_MAP[system]} documentation. You excel at extracting key information and presenting it in a clear, concise manner without adding any external information or mentioning where in the document the information was found.',
        tools=[pdf_search_tool],
        verbose=True
    )

    analyze_task = Task(
        description=f'Quickly analyze the relevant parts of the {SYSTEM_FILENAME_MAP[system]} documentation and provide a summarized answer to the following question: {prompt}. If the question is not related to the document content, politely ask the user to provide a question related to the {SYSTEM_FILENAME_MAP[system]} documentation.',
        expected_output="A concise and accurate answer to the user's question, based solely on the system documentation. The answer should be clear, to the point, and not include any information not present in the documentation. Do not mention where in the document the information was found unless if the question specifically asks for that information. If the information is not found or if the question is unrelated to the document, politely ask the user to provide a question related to the system documentation.",
        agent=analyst_agent
    )

    crew = Crew(
        agents=[analyst_agent],
        tasks=[analyze_task],
        verbose=2
    )

    return crew

def process_prompt(system: str, prompt: str) -> str:
    """
    Process a prompt using the specified system's documentation.

    Args:
        system (str): The system name to use for processing the prompt.
        prompt (str): The prompt or question to process.

    Returns:
        str: The result of processing the prompt.
    """
    try:
        crew = create_crew(system, prompt)
        result = crew.kickoff()
        return str(result)
    except Exception as e:
        print(f"Error processing prompt: {e}")
        return f"An error occurred while processing your request: {str(e)}"

# Ensure the OpenAI API key is set in environment variables
if not os.getenv('OPENAI_API_KEY'):
    raise ValueError("OPENAI_API_KEY is not set in environment variables")
