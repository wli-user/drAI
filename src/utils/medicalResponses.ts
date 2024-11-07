interface Symptom {
  keywords: string[];
  condition: string;
  description: string;
  treatment: string;
  severity: 'mild' | 'moderate' | 'severe';
  seekHelp: boolean;
}

export const symptoms: Symptom[] = [
  {
    keywords: ['headache', 'head pain', 'migraine'],
    condition: 'Headache/Migraine',
    description:
      'You appear to be experiencing a headache, which can be caused by stress, dehydration, or tension.',
    treatment:
      'I recommend: \n1. Taking over-the-counter pain relievers\n2. Resting in a quiet, dark room\n3. Staying hydrated\n4. Applying a cold or warm compress',
    severity: 'mild',
    seekHelp: false,
  },
  {
    keywords: ['fever', 'temperature', 'hot', 'chills'],
    condition: 'Fever',
    description:
      "You seem to have a fever, which is often your body's way of fighting an infection.",
    treatment:
      'I recommend: \n1. Taking acetaminophen or ibuprofen\n2. Drinking plenty of fluids\n3. Getting plenty of rest\n4. Using a light blanket if chilled',
    severity: 'moderate',
    seekHelp: true,
  },
  {
    keywords: ['cough', 'cold', 'sore throat', 'runny nose'],
    condition: 'Common Cold',
    description:
      'Your symptoms suggest a common cold, which is a viral infection of your nose and throat.',
    treatment:
      'I recommend: \n1. Getting plenty of rest\n2. Drinking warm liquids\n3. Using over-the-counter cold medications\n4. Using a humidifier',
    severity: 'mild',
    seekHelp: false,
  },
];

export const analyzeSymptomsFromText = (text: string): Symptom | null => {
  const lowercaseText = text.toLowerCase();

  for (const symptom of symptoms) {
    if (symptom.keywords.some((keyword) => lowercaseText.includes(keyword))) {
      return symptom;
    }
  }

  return null;
};

export const generateResponse = (symptom: Symptom | null): string => {
  if (!symptom) {
    return "I need more specific information about your symptoms to provide accurate advice. Could you please describe what you're experiencing in more detail?";
  }

  let response = `Based on your description, you may have ${symptom.condition}. ${symptom.description}\n\n${symptom.treatment}`;

  if (symptom.seekHelp) {
    response +=
      '\n\nIMPORTANT: Given your symptoms, I recommend consulting with a healthcare provider for proper evaluation and treatment.';
  }

  return response;
};
