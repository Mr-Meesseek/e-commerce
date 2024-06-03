#!/usr/bin/env python
# coding: utf-8

# In[52]:


import unicodedata

def removeDiacritics(text):
    return ''.join(c for c in unicodedata.normalize('NFD', text.lower()) if unicodedata.category(c) != 'Mn')


# In[53]:


import json
import re
import pandas as pd
import os

# Chemin du dossier où sauvegarder le fichier
output_folder = "./translated_data"

# Créer le dossier s'il n'existe pas déjà
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Charger le fichier JSON avec les données originales
with open("anc.json", encoding="utf8") as file:
    discussions = json.load(file)

# Charger le fichier Excel et créer un dictionnaire de traduction
data = pd.read_excel('./Book1.xlsx')
# Replace NaN values with a placeholder or remove rows with NaN in relevant columns
data = data.dropna(subset=['Column3', 'Column5', 'Column8'])
data['Column3'].apply(removeDiacritics)
data['Column5'].apply(removeDiacritics)
data['Column8'].apply(removeDiacritics)
arabish_coda_dict = dict(zip(data['Column3'], data['Column5'].astype(str)))
normm_lemma = dict(zip(data['Column5'].astype(str), data['Column8'].astype(str)))


# In[54]:


# def replace_arabic_with_coda(tokens, arabish_coda_dict):
#     """Traduire les tokens en utilisant le dictionnaire."""
#     new_tokens = []
#     for token in tokens:
#         if token in arabish_coda_dict:
#             new_tokens.append(arabish_coda_dict[token])
#         else:
#             new_tokens.append(token)
#     return new_tokens

def replace_arabic_with_coda(tokens, arabish_coda_dict):
    """Traduire les tokens en utilisant le dictionnaire."""
    new_tokens = []
    for token in tokens:
        token = removeDiacritics(token)
        new_tokens.append(arabish_coda_dict.get(token, token))
    return new_tokens

# def normalize_tokens(tokens, normm_lemma):
#     """Normaliser les tokens en utilisant le dictionnaire."""
#     new_tokens = []
#     for token in tokens:
#         if token in normm_lemma:
#             new_tokens.append(normm_lemma[token])
#         else:
#             new_tokens.append(token)
#     return new_tokens
def normalize_tokens(tokens, normm_lemma):
    """Normaliser les tokens en utilisant le dictionnaire."""
    new_tokens = []
    for token in tokens:
        new_tokens.append(normm_lemma.get(token, token))

    return new_tokens

# def normalize_tokens(tokens):
    
#     # Créer un dictionnaire de correspondance clé-valeur à partir des colonnes 5 et 8
#     mapping = dict(zip(data['Column5'], data['Column8']))
    
#     # Normaliser les tokens en utilisant le dictionnaire de correspondance
#     normalized_tokens = [mapping.get(token, token) for token in tokens]
    
#     return normalized_tokens



# In[55]:


# Traiter chaque discussion pour traduire les questions et les réponses
for discussion in discussions:
    for utterance in discussion:
      
      # Traduction de la question
        question = removeDiacritics(utterance["question"])
        question_tokens = re.findall(r"(\w+|[^\s]+)", question)
        translated_question_tokens = replace_arabic_with_coda(question_tokens, arabish_coda_dict)
        utterance["question"] = " ".join(map(str, translated_question_tokens))  # Ensure all items are strings
        
        
        # Normalisation de la question
        normalized_question_tokens = normalize_tokens(translated_question_tokens, normm_lemma)
        utterance["question_norm"] = " ".join(map(str, normalized_question_tokens))  # Ensure all items are strings

        # Traduction de la réponse
        answer = removeDiacritics(utterance["reponse"])
        answer_tokens = re.findall(r"(\w+|[^\s]+)", answer)
        translated_answer_tokens = replace_arabic_with_coda(answer_tokens, arabish_coda_dict)
        utterance["reponse"] = " ".join(map(str, translated_answer_tokens))  # Ensure all items are strings

        # Affichage des résultats pour vérification
        #print("Translated Question:", utterance["question"])
        #print("Translated Question Norm:", utterance["question_norm"])
        #print("Translated Answer:", utterance["reponse"])
# for discussion in discussions:
#     for utterance in discussion:
#         # Traduction de la question
#         question = utterance["question"].lower()
#         question_tokens = re.findall(r"(\w+|[^\s]+)", question)
#         translated_question_tokens = replace_arabic_with_coda(question_tokens, arabish_coda_dict)
#         normalized_question_tokens = normalize_tokens(translated_question_tokens, normm_lemma)
#         utterance["question"] = " ".join(normalized_question_tokens)

#         # Traduction de la réponse
#         answer = utterance["reponse"].lower()
#         answer_tokens = re.findall(r"(\w+|[^\s]+)", answer)
#         translated_answer_tokens = replace_arabic_with_coda(answer_tokens, arabish_coda_dict)
#         normalized_response_tokens = normalize_tokens(translated_answer_tokens, normm_lemma)
#         utterance["reponse"] = " ".join(normalized_response_tokens)

#         # Affichage des résultats pour vérification
#         print("Translated Question:", utterance["question"])
#         print("Translated Answer:", utterance["reponse"])
        

    # Utiliser les questions et réponses traduites et normalisées pour le traitement ultérieur
    # ...
        
        # updates.append((translated_question_tokens + translated_answer_tokens, q_pos + a_pos, q_lemmas + a_lemmas))
        
     
        


# In[56]:


# Sauvegarder les modifications dans un nouveau fichier JSON dans le dossier créé
output_path = "./res.json"
with open(output_path, "w", encoding="utf8") as file:
    json.dump(discussions, file, indent=4)


# In[59]:


import random

# def read_documents(file_path):
#     discussions = json.load(open(file_path, 'r', encoding='utf-8'))
    
#     #for i, discussion in enumerate(discussions):
#     #    for j, itturance in enumerate(discussion):
#     #        documents[f"{i}_{j}"] = itturance
#     return discussions
def read_documents(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            discussions = json.load(file)
            return discussions
    except FileNotFoundError:
        print("File not found:", file_path)
        return None
    except json.JSONDecodeError as e:
        print("Failed to decode JSON:", e)
        return None
def jaccard_similarity(set1, set2):
    intersection = len(set(set1).intersection(set(set2)))
    union = len(set(set1).union(set(set2)))
    return intersection / union

# S1 : nheb ne5edh 9ardh -> hab 5dhe 9ardh
# S2 : nheb ne5ou 9arth -> hab 5dhe 9ardh
def search(query, discussions, normm_lemma):
    """Search and return top 5 similar documents."""
    normalized_query = normalize_tokens(re.findall(r"(\w+|\S+)", removeDiacritics(query)), normm_lemma)
    results = []
    for disc_id, discussion in enumerate(discussions):
        for utter_id, utterance in enumerate(discussion):
            doc_tokens = normalize_tokens(re.findall(r"(\w+|\S+)", utterance["question_norm"].lower()), normm_lemma)
            similarity = jaccard_similarity(set(normalized_query), set(doc_tokens))
            results.append((disc_id, utter_id, similarity))
    # Sort results by similarity score in descending order and return top 5
    results.sort(key=lambda x: x[2], reverse=True)
    return results[:5]

file_path = './res.json'  # Adjust this to the correct path
excelpath='./Book1.xlsx'
# Load the documents
discussions = read_documents(file_path)
query = "انا عامل مترسم في شركة خاصةوماذبيا على قرض بدون فائض" 

def prevUtterances(utter_id):
    prev_utterances = []
    for utterance in discussions[disc_id][utter_id-2:utter_id]:
        prev_utterances.append(utterance["question"])
        prev_utterances.append(utterance["reponse"])
    return prev_utterances

def topReponses(query, discussions, normm_lemma):
    # Perform the search and get the top 5 results
    search_results = search(query, discussions, normm_lemma)
    reponses = []
    for result in search_results:
        disc_id, utter_id, similarity = result
        reponses.append(discussions[disc_id][utter_id]["reponse"])
        #question = discussions[disc_id][utter_id]["question"]
        
        #print(f"Discussion[{disc_id}, {utter_id}] - Similarity: {similarity}")
        #print(f"Question: {question}")
        #print(f"Reponse: {reponse}")
        #print("\n\n")
    return reponses

# Dataset avec le contexte et les dernieres utterances
dataset = {"data": [{"paragraphs": [], "title": "1"}], "version": "1.1"}

id_qas = 0
for disc_id, discussion in enumerate(discussions):
    for utter_id, utterance in enumerate(discussion):

        # prev utterances
        prev_utterances = prevUtterances(utter_id)
        # top reponses
        top_reponses = topReponses(utterance["question"], discussions, normm_lemma)

        # 6 echantillons: 5 avec la reponse correcte en premier, 1 avec reponses mélangées
        for i in range(6):

            # mélanger les reponses?
            answer_start = 0
            if i>0:
                # Melanger reponses et trouver le nv answer_index
                newL = list(enumerate(top_reponses))
                random.shuffle(newL)
                top_reponses_shuffled = []
                trouve_correct = False
                for old_j, rep in newL:
                    top_reponses_shuffled.append(top_reponses[old_j])

                    # retrouvé la reponse correcte?
                    if old_j==0:
                        trouve_correct = True
                    elif not trouve_correct:
                        answer_start += len(rep) + 3

                top_reponses = top_reponses_shuffled
            id_qas += 1
            context = " ; ".join(top_reponses) + " ;"
            question = "\n".join(prev_utterances) + "\n" + utterance["question"]
            answer_text = utterance["reponse"]

            # remplir le dataset
            dataset["data"][0]["paragraphs"].append(
                {
                    "context": context,
                    "qas": [
                        {
                            "id": str(id_qas),
                            "question": question,
                            "answers": [{"answer_start": answer_start, "text": answer_text}]
                        }
                    ]
                }
            )

output_path = "./dataset.json"
with open(output_path, "w", encoding="utf8") as file:
    json.dump(dataset, file, indent=4)

