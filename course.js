/* ===== Estructura del curso (temario de Gringo Academy, extraído del área de miembros) ===== */
const L1META = `Despertando en una nave espacial|Verb "Be"|Family|Contractions
Conociendo a Mr. Fagorz|Simple Present Verbs|Possessive Adjectives|Contractions Pt. 2
Your First Lesson with Mr. Fagorz|Like + Want + Need|Numbers + Colors|The Alphabet Song
Welcome to Alienapolis|'s (Possession)|Can|Short Vowels
Shopping at Mars Mart|Short Responses + WH-questions|Another / Other|Long Vowels
Nice to Meet You, Fagorz Family!|Object Pronouns|Imperatives|Long vs. Short Vowels
The Mars Police|Was / Were|Dates + Ordinal Numbers|Diphthongs
Let's Take a Tour of Alienapolis!|This / That / These / Those|30 Most Common Verbs|Schwa
Mr. Fagorz's Secret|In / On / At · There is / There are|Prepositions of Place|Vowel Review
The Evil Alien|Past Simple|Noun Challenge|True Friends
Is Maria a Hero?|Past Simple (Irregular Verbs) Pt. 1|How to Share Your Routine|True Friends 2
The Hospital|The vs. A / An|Body Parts|Nasal Sounds
Meeting with President Gregob|WH-questions (Review)|Adjective Song|Y & J Sounds
The First Date|Being polite with "Would like"|Going to a Restaurant|R Sound
The Plan|Talk about the Future with "Will"|The Prepositions Song|TH Sounds
The Enemy's House|Past Simple (Irregular Verbs) Pt. 2|Prepositions of Movement|Three New Sounds
Roshark's Business|Past Simple (Irregular Verbs) Pt. 3|Prepositions of Time|The L Sounds
The Prison|Short Responses Pt. 2|Verb Challenge|Long & Short OO
The Final Battle|Past Simple (Irregular Verbs) Pt. 4|Noun Challenge Pt. 1|Flap T
The Little Surprise|Grammar Celebration (Review)|Noun Challenge Pt. 2|TR & DR Sounds`;

const L2META = `Pasando por inmigración|Present Continuous||
Taxi!|Should + Shouldn't||
Worst First Date Ever|Be going to + A / An / Some / Any||
María's Routine|Routine (Vocabulary + Grammar)||
Let's Go Shopping|Shopping (Vocabulary + Grammar)||
The VIP Party|Modifiers||Informal Contractions
The Interview Fairy|Comparatives vs. Superlatives||-ous Adjectives
The Best Candidate is...|Verb Patterns|Noun Challenge|Sentence Stress
First Day at Work|Demonstrative Pronouns|Verb Challenge|Sentence Stress Review
Hospital|I've Got|Medical Vocabulary|
Vanessa vs. María|WH-questions in the Past|Prepositions of Movement|
Take Me Out to the Ball Game|A / An / The / Zero Article|Sports Vocabulary|
María Becomes a Professional Wrestler|Adverbs of Manner|Adverbs of Manner|
The Mexican Legend vs. The Praying Mantis|Present Continuous vs. Present Simple|Noun Challenge|
The Taco Conspiracy|Past Simple vs. Past Continuous|Adjective Challenge|
The Plan|It's good to see you! (social expressions)|Verb Challenge|
Dr. Tacohater's Secret Weapon|Verbs of Sensation|Verbs of Sensation|
The Salsa Escape|Subject and Object Questions|Noun Challenge: Politics|
María vs. Dr. Tacohater|Verbs with Two Objects|Conversational Adverbs|
Is This Goodbye?|Possessive + Indefinite Pronouns|Noun Challenge: Education|`;

const L3META = `Welcome to the Video Game Matrix|Phrasal Verbs|Phrasal Verbs|
The Diamond Heist|Present Perfect||
Welcome to Springfield Prison|Modal Verbs: Should / Must||
The Great Escape|Can, Could, Be able to||
The Interrogation Room|Verb Patterns (-ing verbs)||
The Truth|Narrative Tenses||
The Last Escape|Be going to · Will · Present Continuous · Might||
Prison Break|-ed and -ing Adjectives||
Hot Pursuit|A / An, The + Zero Article||
Wanted: Dead or Alive|Object vs. Subject Questions||
The Ocean Escape|Past Simple vs. Present Perfect|Phrasal Verb Challenge Pt. 1|
The Secret Island|Defining Relative Clauses|Phrasal Verb Challenge Pt. 2|
It's Time to Hack the Game|Present Perfect and Superlatives|Phrasal Verb Challenge Pt. 3|
Illusion City|Used To|Phrasal Verb Challenge Pt. 4|
Escape the Control Tower|Zero and First Conditional|The 150 Most Common Phrasal Verbs|
Mission 2: Meet the Real You|Second Conditional|Adjective Challenge|
María's Real Name|Third Conditional|Verb Challenge|
A Trip Down Memory Lane|Reported Speech|Conversational Adverbs Pt. 2|
The Parallel Universe|Prepositions of Time|Verb Challenge|
Robert's Hardest Decision|Indirect and Negative Questions|Adjective Challenge|
The Battle|Used to / Get used to|Simon Says|
The Mirror of Truth|Reflexive Pronouns|Adjective Challenge|
The Mirror of Truth, Part 2|Present Perfect Continuous|Intensity Adverbs|
Inside E.V.I.L.'s Headquarters|Introduction to the Passive Voice|Verb Challenge (Business English)|
The Secret Client|Clauses of Purpose|Adjectives: Quantities|
Welcome to the Final Mission|Regrets with "Should have"||
Beware the Sensory Traps|So / Such||
The Chosen One|Causative Have + Get||
The Confrontation|Except for, Apart from + Not even||
The Final Battle: Anger vs. Love|Conditional Structures||`;

const L4META = `B.U.D.D.I.E.S.|To vs. -ING||
Sam's Sickness|Emphasizing with Do, Does and Did||
Renovating Steven's Apartment|Future Probability: Will vs. Be going to vs. Might / May / Could||
Winning it Big|Future Continuous vs. Future Perfect||
The Lost Ticket|Past Modals of Deduction||
Hopelessness|Wish, If only, Should have||
Bob's Search for Love|Prepositional Verbs||
Rachel's Search for Love|Past Perfect Simple vs. Past Perfect Continuous||
Is it a Match?|Cleft Sentences||
Sam's Work History|Unsuccessful Plans||
The Job Hunt|Reported Orders, Requests and Advice||
Becoming Dr. Bob's Assistant|Non-defining Relative Clauses||
Dr. Bob or Dr. Love?|Tag Questions||
The Dating Expert|Adjectives + Prepositions||
The Date|Prepositional Verbs Pt. 2||
The Lab Rat|Passive Voice Pt. 2||
The Chocolate Dealer|Adverbials of Concession||
The Chocolate Confrontation|The Continuous Aspect||`;

const L5META = `Native Fluency: Telenovela 1|Advanced fluency (C1)||`;

const PRMETA = `Lesson 1: p + b (Stop Consonants)|The Native Sound System||p + b (Stop Consonants)
Lesson 2: k + g (Stop Consonants)|The Native Sound System||k + g (Stop Consonants)
Lesson 3: t + d (Stop Consonants)|The Native Sound System||t + d (Stop Consonants)
Lesson 4: ɾ (Flap T)|The Native Sound System||ɾ (Flap T)
Lesson 5: f + v (Fricatives)|The Native Sound System||f + v (Fricatives)
Lesson 6: θ + ð: The TH Sounds (Fricatives)|The Native Sound System||θ + ð: The TH Sounds (Fricatives)
Lesson 7: s + z (Fricatives)|The Native Sound System||s + z (Fricatives)
Lesson 8: ʃ + ʒ: SH and ZH Sounds (Fricatives)|The Native Sound System||ʃ + ʒ: SH and ZH Sounds (Fricatives)
Lesson 9: h (Fricatives)|The Native Sound System||h (Fricatives)
Lesson 10: tʃ + dʒ: CH and J Sounds (Affricates)|The Native Sound System||tʃ + dʒ: CH and J Sounds (Affricates)
Lesson 11: n + m (Nasals)|The Native Sound System||n + m (Nasals)
Lesson 12: ŋ: The NG Sound (Nasals)|The Native Sound System||ŋ: The NG Sound (Nasals)
Lesson 13: ɹ: The R Sound (Liquids)|The Native Sound System||ɹ: The R Sound (Liquids)
Lesson 14: l + ɫ: Light L + Dark L (Liquids)|The Native Sound System||l + ɫ: Light L + Dark L (Liquids)
Lesson 15: w + j (Glides)|The Native Sound System||w + j (Glides)
Lesson 16: Short A /æ/ + Long A /eɪ/ (Vowels)|The Native Sound System||Short A /æ/ + Long A /eɪ/ (Vowels)
Lesson 17: Short E /ɛ/ + Long E /i/ (Vowels)|The Native Sound System||Short E /ɛ/ + Long E /i/ (Vowels)
Lesson 18: Short I /ɪ/ + Long I /aɪ/ (Vowels)|The Native Sound System||Short I /ɪ/ + Long I /aɪ/ (Vowels)
Lesson 19: Short O /ɑ/ + Long O /oʊ/ (Vowels)|The Native Sound System||Short O /ɑ/ + Long O /oʊ/ (Vowels)
Lesson 20: Short U /ʌ/ + Long U /ju/ (Vowels)|The Native Sound System||Short U /ʌ/ + Long U /ju/ (Vowels)
Lesson 21: Short + Long Vowels Practice|The Native Sound System||Short + Long Vowels Practice
Lesson 22: The Magic E + Closed/Open Syllables|The Native Sound System||The Magic E + Closed/Open Syllables
Lesson 23: Short OO /ʊ/ and Long OO /u/ (Vowels)|The Native Sound System||Short OO /ʊ/ and Long OO /u/ (Vowels)
Lesson 24: aʊ + ɔɪ: Diphthongs (Vowels)|The Native Sound System||aʊ + ɔɪ: Diphthongs (Vowels)
Lesson 25: ə: The Schwa (Vowels)|The Native Sound System||ə: The Schwa (Vowels)
Lesson 26: R-Controlled Vowels|The Native Sound System||R-Controlled Vowels
Lesson 27: R-Controlled Vowels Pt. 2|The Native Sound System||R-Controlled Vowels Pt. 2
Lesson 28: TR + DR (Trucos Gringos)|The Native Sound System||TR + DR (Trucos Gringos)
Lesson 29: SURE + TURE (Trucos Gringos)|The Native Sound System||SURE + TURE (Trucos Gringos)
Lesson 30: TION + SION (Trucos Gringos)|The Native Sound System||TION + SION (Trucos Gringos)
Lesson 31: -OUS Adjectives (Trucos Gringos)|The Native Sound System||-OUS Adjectives (Trucos Gringos)
Lesson 32: -ED Endings (Trucos Gringos)|The Native Sound System||-ED Endings (Trucos Gringos)
Lesson 33: -CALLY + -ALLY (Trucos Gringos)|The Native Sound System||-CALLY + -ALLY (Trucos Gringos)
Lesson 34: EL, EM, EN, ER (Syllabic Consonants)|The Native Sound System||EL, EM, EN, ER (Syllabic Consonants)
Lesson 35: Consonant Clusters Pt. 1 (Trucos Gringos)|The Native Sound System||Consonant Clusters Pt. 1 (Trucos Gringos)
Lesson 36: Consonant Clusters Pt. 2 (Trucos Gringos)|The Native Sound System||Consonant Clusters Pt. 2 (Trucos Gringos)
Lesson 37: Consonant Clusters Pt. 3 (Trucos Gringos)|The Native Sound System||Consonant Clusters Pt. 3 (Trucos Gringos)
Lesson 38: Consonant Clusters Pt. 4 (Trucos Gringos)|The Native Sound System||Consonant Clusters Pt. 4 (Trucos Gringos)
Lesson 39: Consonant Clusters Pt. 5 (Trucos Gringos)|The Native Sound System||Consonant Clusters Pt. 5 (Trucos Gringos)
Lesson 40: Consonant Clusters Pt. 6 (Trucos Gringos)|The Native Sound System||Consonant Clusters Pt. 6 (Trucos Gringos)
Lesson 41: Word Stress|The Rhythm of American English||Word Stress
Lesson 42: Function Words vs. Content Words|The Rhythm of American English||Function Words vs. Content Words
Lesson 43: Weak vs. Strong Forms|The Rhythm of American English||Weak vs. Strong Forms
Lesson 44: Rhythm Practice|The Rhythm of American English||Rhythm Practice
Lesson 45: What is Intonation?|Master the Melody of American English||What is Intonation?
Lesson 46: Everyday Intonation Pt. 2|Master the Melody of American English||Everyday Intonation Pt. 2
Lesson 47: Everyday Intonation Pt. 3|Master the Melody of American English||Everyday Intonation Pt. 3
Lesson 48: Breaking the Rules with Emotions|Master the Melody of American English||Breaking the Rules with Emotions
Lesson 49: How Intonation Can Completely Change the Meaning|Master the Melody of American English||How Intonation Can Completely Change the Meaning
Lesson 50: Rise-Fall vs. Fall-Rise Intonation|Master the Melody of American English||Rise-Fall vs. Fall-Rise Intonation
Lesson 51: Intonation Practice|Master the Melody of American English||Intonation Practice
Lesson 52: Intonation Practice Pt. 2|Master the Melody of American English||Intonation Practice Pt. 2
Lesson 53: What is Linking? Consonant-Vowel Linking|Instant Comprehension||What is Linking? Consonant-Vowel Linking
Lesson 54: Linking: Vowel-Vowel|Instant Comprehension||Linking: Vowel-Vowel
Lesson 55: Linking: Consonant-Consonant|Instant Comprehension||Linking: Consonant-Consonant
Lesson 56: Linking: Consonant-Consonant Pt. 2|Instant Comprehension||Linking: Consonant-Consonant Pt. 2
Lesson 57: Flap T Linking|Instant Comprehension||Flap T Linking
Lesson 58: Linking Practice|Instant Comprehension||Linking Practice
Lesson 59: What is Coalescence?|Instant Comprehension||What is Coalescence?
Lesson 60: Coalescence Pt. 2|Instant Comprehension||Coalescence Pt. 2
Lesson 61: Coalescence in Words|Instant Comprehension||Coalescence in Words
Lesson 62: Coalescence Practice|Instant Comprehension||Coalescence Practice
Lesson 63: What is Elision?|Instant Comprehension||What is Elision?
Lesson 64: Elision Pt. 2|Instant Comprehension||Elision Pt. 2
Lesson 65: Elision Pt. 3|Instant Comprehension||Elision Pt. 3
Lesson 66: Elision Practice|Instant Comprehension||Elision Practice
Lesson 67: What is Reduction?|Instant Comprehension||What is Reduction?
Lesson 68: The Fat Sloth|Instant Comprehension||The Fat Sloth
Lesson 69: The Fat Sloth: Auxiliaries|Instant Comprehension||The Fat Sloth: Auxiliaries
Lesson 70: The Fat Sloth: Verb + To|Instant Comprehension||The Fat Sloth: Verb + To
Lesson 71: The Fat Sloth: Verb + To Pt. 2|Instant Comprehension||The Fat Sloth: Verb + To Pt. 2
Lesson 72: The Fat Sloth: Of Expressions|Instant Comprehension||The Fat Sloth: Of Expressions
Lesson 73: Whatcha|Instant Comprehension||Whatcha
Lesson 74: WH-Questions + did you|Instant Comprehension||WH-Questions + did you
Lesson 75: Modals + have|Instant Comprehension||Modals + have
Lesson 76: Modals + have (Negative)|Instant Comprehension||Modals + have (Negative)
Lesson 77: What is Assimilation?|Instant Comprehension||What is Assimilation?
Lesson 78: Assimilation with Velar Consonants (k + g)|Instant Comprehension||Assimilation with Velar Consonants (k + g)
Lesson 79: Assimilation Practice|Instant Comprehension||Assimilation Practice
Lesson 80: Connected Speech Practice|Instant Comprehension||Connected Speech Practice
Lesson 81: NT|The Accent Reset||NT
Lesson 82: The Glottal Stop /ʔ/|The Accent Reset||The Glottal Stop /ʔ/
Lesson 83: Silent Letters: T|The Accent Reset||Silent Letters: T
Lesson 84: Silent Letters: L|The Accent Reset||Silent Letters: L
Lesson 85: Silent Letters Pt. 3|The Accent Reset||Silent Letters Pt. 3
Lesson 86: Level 1 Review: The Native Sound System|Bonus: The Final Integration||Level 1 Review: The Native Sound System
Lesson 87: Level 2 Review: The Rhythm of American English|Bonus: The Final Integration||Level 2 Review: The Rhythm of American English
Lesson 88: Level 3 Review: Master the Melody|Bonus: The Final Integration||Level 3 Review: Master the Melody
Lesson 89: Level 4 Review: Instant Comprehension|Bonus: The Final Integration||Level 4 Review: Instant Comprehension
Lesson 90: The Final Review|Bonus: The Final Integration||The Final Review`;
