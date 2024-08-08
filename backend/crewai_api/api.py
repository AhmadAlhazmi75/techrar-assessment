from ninja import Router
from .crewai_setup import process_prompt

router = Router()

@router.post("/ask")
def ask_question(request, system: str, prompt: str):
    """
    Endpoint to ask a question to the AI system.

    Args:
        request: The HTTP request object.
        system (str): The system to use for generating the solution.
        prompt (str): The prompt or question to ask the AI system.

    Returns:
        dict: A dictionary containing the result or an error message.
    """
    if not system or not prompt:
        return {"error": "Both system and prompt are required"}

    try:
        result = process_prompt(system, prompt)
        return {"result": str(result)}
    except ValueError as e:
        return {"error": str(e)}
    except FileNotFoundError as e:
        return {"error": str(e)}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
