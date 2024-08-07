from ninja import Router
from .crewai_setup import process_prompt

router = Router()

@router.post("/ask")
def ask_question(request, system: str, prompt: str):
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
