# import os
# import requests
# import json

# # Load API Key from GitHub Secrets
# API_KEY = os.getenv("GEMINI_API_KEY")
# GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

# # Get the last 5 commit messages
# def get_latest_commits():
#     commits = os.popen("git log --pretty=format:'%s' -n 5").read().split("\n")
#     return commits

# # Generate AI summary
# def generate_summary(commits):
#     headers = {"Content-Type": "application/json"}
#     data = {
#         "contents": [{"parts": [{"text": f"Summarize these commit messages in a professional and concise way:\n{commits}"}]}],
#         "generationConfig": {"temperature": 0.7, "maxOutputTokens": 200}
#     }
    
#     response = requests.post(f"{GEMINI_API_URL}?key={API_KEY}", headers=headers, json=data)
    
#     if response.status_code == 200:
#         result = response.json()
#         return result["candidates"][0]["content"]["parts"][0]["text"]
#     else:
#         return "Error generating summary"

# # Update README file
# def update_readme(summary):
#     with open("README.md", "r", encoding="utf-8") as file:
#         readme_content = file.readlines()

#     # Find Changelog Section
#     changelog_index = next((i for i, line in enumerate(readme_content) if "## Changelog" in line), None)
    
#     if changelog_index is not None:
#         readme_content.insert(changelog_index + 1, f"\n### {os.popen('date "+%Y-%m-%d"').read().strip()}\n{summary}\n")
#     else:
#         readme_content.append(f"\n## Changelog\n### {os.popen('date "+%Y-%m-%d"').read().strip()}\n{summary}\n")

#     # Write back to README
#     with open("README.md", "w", encoding="utf-8") as file:
#         file.writelines(readme_content)

# if __name__ == "__main__":
#     commits = get_latest_commits()
#     summary = generate_summary(commits)
#     if "Error" not in summary:
#         update_readme(summary)
#         print("README updated successfully.")
#     else:
#         print("Failed to update README.")
