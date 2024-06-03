import re
import json
from final import removeDiacritics,replace_arabic_with_coda,normalize_tokens,read_documents,jaccard_similarity,prevUtterances,topReponses,search
def preprocess(text):
    text_no_diacritics = removeDiacritics(text)
    tokens = text_no_diacritics.split()  
    replaced_tokens = replace_arabic_with_coda(tokens)
    normalized_tokens = normalize_tokens(replaced_tokens)
    # Step 4: Join tokens back to form the processed text string (if necessary, depending on further usage)
    processed_text = ' '.join(normalized_tokens)
    return processed_text

def find_similar_responses(processed_query, discussions):
    results = search(processed_query, discussions)
    top_responses = topReponses(results, discussions)

    return top_responses

def search(query, discussions):
    query_tokens = set(query.split())  # Example of tokenization
    results = []
    for disc_id, discussion in enumerate(discussions):
        for utter_id, utterance in enumerate(discussion):
            utterance_tokens = set(utterance.split())  # Assuming simple tokenization
            similarity = jaccard_similarity(query_tokens, utterance_tokens)
            results.append((disc_id, utter_id, similarity))
    # Sort by similarity score in descending order
    results.sort(key=lambda x: x[2], reverse=True)
    return results[:5]  # Return top 5 similar