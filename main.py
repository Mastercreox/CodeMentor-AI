# CodeMentor AI – Advanced Offline AI Logic
# Hackathon-safe | No server | No SSL | Runs anywhere

def ai_explain(language, code, error, explain_language):
    # Basic error dictionary with explanations
    error_db = {
        "NameError": {
            "Concept": {
                "en": "Variables / Naming Basics",
                "hi": "Variable / Naamkaran ke niyam"
            },
            "Explanation": {
                "en": f"The error '{error}' indicates that a variable or function is being used before it is defined.",
                "hi": f"Error '{error}' ka matlab hai ki variable ya function use karte waqt wo define nahi tha."
            },
            "Example": {
                "en": "x = 10\nprint(x)",
                "hi": "x = 10\nprint(x)"
            },
            "Suggested Fix": {
                "en": "Define variables or functions before using them.",
                "hi": "Variable ya function ko pehle define karo phir use karo."
            }
        },
        "TypeError": {
            "Concept": {
                "en": "Data Types and Operations",
                "hi": "Data Types aur Operations"
            },
            "Explanation": {
                "en": f"The error '{error}' means there is an operation on incompatible data types.",
                "hi": f"Error '{error}' ka matlab hai ki incompatible data types par operation kiya gaya hai."
            },
            "Example": {
                "en": 'x = "10"\ny = 5\nprint(int(x) + y)',
                "hi": 'x = "10"\ny = 5\nprint(int(x) + y)'
            },
            "Suggested Fix": {
                "en": "Make sure to use compatible data types or cast them properly.",
                "hi": "Compatible data types use karo ya sahi tarah cast karo."
            }
        },
        "IndexError": {
            "Concept": {
                "en": "List / Sequence Indexing",
                "hi": "List / Sequence Indexing"
            },
            "Explanation": {
                "en": f"The error '{error}' indicates you are trying to access an invalid index.",
                "hi": f"Error '{error}' ka matlab hai ki invalid index access kar rahe ho."
            },
            "Example": {
                "en": 'lst = [1,2,3]\nprint(lst[1])',
                "hi": 'lst = [1,2,3]\nprint(lst[1])'
            },
            "Suggested Fix": {
                "en": "Check list length before accessing indices.",
                "hi": "Index access karne se pehle list ki length check karo."
            }
        },
        "SyntaxError": {
            "Concept": {
                "en": "Syntax Rules",
                "hi": "Syntax ke niyam"
            },
            "Explanation": {
                "en": f"The error '{error}' indicates invalid Python syntax.",
                "hi": f"Error '{error}' ka matlab hai ki Python syntax galat hai."
            },
            "Example": {
                "en": 'print("Hello World")',
                "hi": 'print("Hello World")'
            },
            "Suggested Fix": {
                "en": "Check for missing colons, parentheses, or indentation.",
                "hi": "Missing colon, parentheses ya indentation ko check karo."
            }
        }
    }

    # Extract error type (before ':')
    error_type = error.split(":")[0] if ":" in error else error

    if error_type in error_db:
        explanation = error_db[error_type]
        return {
            "Explanation": explanation["Explanation"][explain_language],
            "Concept": explanation["Concept"][explain_language],
            "Example": explanation["Example"][explain_language],
            "Suggested Fix": explanation["Suggested Fix"][explain_language]
        }
    else:
        # Generic fallback
        if explain_language == "hi":
            return {
                "Explanation": f"Error '{error}' aapke code me kisi prakaar ki problem ka sanket deta hai.",
                "Concept": "Programming Concepts",
                "Example": "print('Hello World')",
                "Suggested Fix": "Code ko dhyan se check karein"
            }
        else:
            return {
                "Explanation": f"The error '{error}' indicates some issue in your code.",
                "Concept": "Programming Concepts",
                "Example": "print('Hello World')",
                "Suggested Fix": "Please review your code carefully"
            }

if __name__ == "__main__":
    print("\n=== CodeMentor AI – Advanced Student Demo (Offline Mode) ===\n")

    # Sample inputs to try out.
    language = "Python"

    # You can test different errors here:
    code = "print(x)"
    error = "NameError: name 'x' is not defined"
    
    # error = "TypeError: unsupported operand type(s) for +: 'int' and 'str'"
    # code = "x = 5 + '10'"

    # error = "IndexError: list index out of range"
    # code = "lst = [1, 2, 3]\nprint(lst[5])"

    # error = "SyntaxError: invalid syntax"
    # code = "if True print('Hello')"

    explain_language = "hi"  # 'hi' or 'en'

    result = ai_explain(language, code, error, explain_language)

    print("Language:", language)
    print("Student Code:\n", code)
    print("Error:", error)
    print("\n--- AI Explanation ---")
    for k, v in result.items():
        print(f"{k}: {v}")

    print("\n✅ Advanced demo executed successfully.\n")