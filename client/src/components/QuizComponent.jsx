import React, { useState, useEffect } from 'react';
import { Card, Typography, Progress, Space, Radio, Divider } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
    
    const { Title, Text } = Typography;
    
    const staticQuizData = {
      developpement: [
        {
          question: 'Quel langage est principalement utilisé pour le développement web côté client ?',
          options: ['Python', 'JavaScript', 'Java', 'PHP'],
          correctAnswer: 1,
        },
        {
          question: 'Quel framework JavaScript est développé par Facebook ?',
          options: ['Vue.js', 'Angular', 'React', 'Svelte'],
          correctAnswer: 2,
        },
        {
          question: 'Quel protocole est utilisé pour la communication Web sécurisée ?',
          options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
          correctAnswer: 1,
        },
        {
          question: 'Que signifie SQL ?',
          options: [
            'Structured Query Language',
            'Sequential Query Logic',
            'Standard Query Language',
            'Simple Question Language',
          ],
          correctAnswer: 0,
        },
        {
          question: 'Lequel de ces langages est typé statiquement ?',
          options: ['JavaScript', 'Python', 'Java', 'PHP'],
          correctAnswer: 2,
        },
        {
          question: 'Quel outil est utilisé pour le contrôle de version ?',
          options: ['Webpack', 'Git', 'Jenkins', 'Figma'],
          correctAnswer: 1,
        },
        {
          question: 'Quelle est la commande Git pour envoyer des changements vers un dépôt distant ?',
          options: ['git push', 'git pull', 'git add', 'git commit'],
          correctAnswer: 0,
        },
        {
          question: 'Quelle est la base de données NoSQL parmi les suivantes ?',
          options: ['MySQL', 'MongoDB', 'PostgreSQL', 'Oracle'],
          correctAnswer: 1,
        },
        {
          question: 'Quel langage est principalement utilisé avec Django ?',
          options: ['PHP', 'Java', 'Python', 'Ruby'],
          correctAnswer: 2,
        },
        {
          question: 'En React, que retourne un hook `useState` ?',
          options: [
            'Un objet',
            'Une fonction',
            'Un tableau avec une valeur et une fonction',
            'Un composant',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Qu’est-ce qu’un composant fonctionnel en React ?',
          options: [
            'Un fichier CSS',
            'Une fonction qui retourne du JSX',
            'Une méthode du DOM',
            'Une classe avec des méthodes',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Quelle technologie permet le responsive design ?',
          options: ['CSS Grid', 'Bootstrap', 'Media Queries', 'Toutes les réponses'],
          correctAnswer: 3,
        },
        {
          question: 'Quel est l’équivalent d’une clé primaire en MongoDB ?',
          options: ['id', '_id', 'key', 'uuid'],
          correctAnswer: 1,
        },
        {
          question: 'Quel est le rôle de Node.js ?',
          options: [
            'Compiler le code JavaScript',
            'Exécuter du JavaScript côté serveur',
            'Créer des styles CSS',
            'Rendre le HTML interactif',
          ],
          correctAnswer: 1,
        },
        {
          question: 'Quel est le fichier de configuration principal dans un projet Node.js ?',
          options: ['server.js', 'index.js', 'config.json', 'package.json'],
          correctAnswer: 3,
        },
        {
          question: 'Quelle extension est utilisée pour les fichiers React ?',
          options: ['.js', '.jsx', '.html', '.ts'],
          correctAnswer: 1,
        },
        {
          question: 'Quelle méthode HTTP est utilisée pour récupérer des données ?',
          options: ['GET', 'POST', 'PUT', 'DELETE'],
          correctAnswer: 0,
        },
        {
          question: 'En CSS, à quoi sert `flex` ?',
          options: [
            'À rendre le texte en gras',
            'À créer des animations',
            'À gérer l’alignement des éléments',
            'À changer la couleur',
          ],
          correctAnswer: 2,
        },
        {
          question: 'Quelle balise HTML est utilisée pour les formulaires ?',
          options: ['<form>', '<input>', '<label>', '<div>'],
          correctAnswer: 0,
        },
        {
          question: 'Quel mot-clé est utilisé pour créer une promesse en JavaScript ?',
          options: ['await', 'then', 'Promise', 'async'],
          correctAnswer: 2,
        },
      ],
      ai: [
        {
          question: "Quel est l'algorithme le plus utilisé en apprentissage supervisé ?",
          options: ['K-means', 'Réseaux de neurones', 'SVM', 'Régression linéaire'],
          correctAnswer: 3,
        },
        {
          question: 'Qu’est-ce que le Machine Learning ?',
          options: ['Une méthode pour coder plus rapidement', 'Un type de robot', 'Une branche de l’IA qui apprend à partir des données', 'Un langage de programmation'],
          correctAnswer: 2,
        },
        {
          question: 'Quel langage est largement utilisé pour l’IA ?',
          options: ['Python', 'JavaScript', 'PHP', 'HTML'],
          correctAnswer: 0,
        },
        {
          question: 'Qu’est-ce qu’un réseau de neurones artificiels ?',
          options: ['Un réseau social', 'Une base de données', 'Un système inspiré du cerveau humain pour traiter des données', 'Un algorithme de tri'],
          correctAnswer: 2,
        },
        {
          question: 'Quelle bibliothèque Python est utilisée pour le Machine Learning ?',
          options: ['NumPy', 'Pandas', 'TensorFlow', 'Flask'],
          correctAnswer: 2,
        },
        {
          question: 'Que fait un algorithme supervisé ?',
          options: ['Il classe les données sans étiquette', 'Il utilise des étiquettes pour apprendre', 'Il ne traite que les images', 'Il est utilisé pour créer des sites web'],
          correctAnswer: 1,
        },
        {
          question: 'Quel est le rôle d’un dataset ?',
          options: ['Créer des graphiques', 'Stocker du texte', 'Entraîner un modèle IA', 'Optimiser le SEO'],
          correctAnswer: 2,
        },
        {
          question: 'Qu’est-ce que le Deep Learning ?',
          options: ['Un langage IA', 'Une extension de CSS', 'Une sous-catégorie du Machine Learning avec des réseaux de neurones profonds', 'Un logiciel'],
          correctAnswer: 2,
        },
        {
          question: 'Quelle est l’unité fondamentale d’un réseau neuronal ?',
          options: ['Pixel', 'Bit', 'Neurone', 'Image'],
          correctAnswer: 2,
        },
        {
          question: 'Qu’est-ce qu’un classifieur ?',
          options: ['Un plugin', 'Un type de virus', 'Un modèle qui prédit une catégorie', 'Une API'],
          correctAnswer: 2,
        },
        {
          question: 'Quel est l’objectif d’une fonction de perte ?',
          options: ['Optimiser le SEO', 'Calculer la performance du modèle', 'Dessiner un graphique', 'Compresser les données'],
          correctAnswer: 1,
        },
        {
          question: 'Quel outil est utilisé pour entraîner des modèles IA en cloud ?',
          options: ['Google Colab', 'WordPress', 'MySQL', 'GIMP'],
          correctAnswer: 0,
        },
        {
          question: 'Qu’est-ce que l’overfitting ?',
          options: ['Un bug matériel', 'Un excès d’entraînement qui nuit à la généralisation', 'Un outil de compression', 'Un virus informatique'],
          correctAnswer: 1,
        },
        {
          question: 'Quelle tâche l’IA ne peut pas encore accomplir parfaitement ?',
          options: ['Reconnaissance d’image', 'Création de contenu 100% original', 'Traduction', 'Prédiction de tendances'],
          correctAnswer: 1,
        },
        {
          question: 'Quel type d’apprentissage est utilisé sans étiquettes ?',
          options: ['Apprentissage supervisé', 'Apprentissage non supervisé', 'Deep learning', 'Réseau bayésien'],
          correctAnswer: 1,
        },
        {
          question: 'Qu’est-ce qu’un chatbot ?',
          options: ['Un site web', 'Un virus', 'Un programme qui simule une conversation humaine', 'Un tableau de bord'],
          correctAnswer: 2,
        },
        {
          question: 'À quoi sert OpenAI GPT ?',
          options: ['Créer des vidéos', 'Optimiser un site', 'Générer du texte de manière autonome', 'Coder des apps'],
          correctAnswer: 2,
        },
        {
          question: 'Que signifie NLP en IA ?',
          options: ['Neural Learning Program', 'Natural Language Processing', 'Network Logical Processor', 'None Local Prediction'],
          correctAnswer: 1,
        },
        {
          question: 'Quel est le rôle des biais en IA ?',
          options: ['Améliorer les performances', 'Créer des interfaces', 'Introduire des erreurs systématiques', 'Nettoyer les données'],
          correctAnswer: 2,
        },
        {
          question: 'Quel domaine n’utilise pas encore massivement l’IA ?',
          options: ['Médecine', 'Finance', 'Agriculture', 'Plomberie'],
          correctAnswer: 3,
        },
        
      ],
      marketing: [
        {
          question: 'Que signifie le terme "SEO" ?',
          options: ['Social Engagement Optimization', 'Search Engine Optimization', 'Sales Email Outreach', 'Site Engine Objective'],
          correctAnswer: 1,
        },
        {
          question: 'Qu’est-ce que le marketing digital ?',
          options: ['Un type de design', 'La vente physique de produits', 'L’ensemble des actions marketing en ligne', 'Un service client automatisé'],
          correctAnswer: 2,
        },
        {
          question: 'Que signifie SEO ?',
          options: ['Search Engine Optimization', 'Software Easy Operation', 'Secure Email Option', 'Social Engagement Optimization'],
          correctAnswer: 0,
        },
        {
          question: 'Quel réseau est principalement utilisé pour le B2B ?',
          options: ['Instagram', 'TikTok', 'LinkedIn', 'Snapchat'],
          correctAnswer: 2,
        },
        {
          question: 'Quelle est la fonction d’un persona marketing ?',
          options: ['Créer un logo', 'Représenter un client type', 'Vendre un produit', 'Faire des vidéos'],
          correctAnswer: 1,
        },
        {
          question: 'Qu’est-ce qu’un taux de conversion ?',
          options: ['Le nombre de visites', 'Le ratio des clics', 'Le pourcentage d’actions réalisées par rapport aux visiteurs', 'Le prix d’un clic'],
          correctAnswer: 2,
        },
        {
          question: 'Quel outil est utilisé pour suivre le trafic web ?',
          options: ['Figma', 'Google Analytics', 'Canva', 'Shopify'],
          correctAnswer: 1,
        },
        {
          question: 'Que mesure le ROI en marketing ?',
          options: ['Le retour sur investissement', 'Le nombre de clients', 'La satisfaction client', 'Le nombre de produits en stock'],
          correctAnswer: 0,
        },
        {
          question: 'Qu’est-ce que le marketing d’influence ?',
          options: ['La vente via un site web', 'Faire appel à des influenceurs pour promouvoir un produit', 'L’envoi d’emails', 'Le marketing téléphonique'],
          correctAnswer: 1,
        },
        {
          question: 'Qu’est-ce qu’une campagne PPC ?',
          options: ['Pay Per Click', 'Public Paid Content', 'Push Product Content', 'Promo Product Card'],
          correctAnswer: 0,
        },
        {
          question: 'Quel est le rôle du content marketing ?',
          options: ['Créer des publicités radio', 'Créer du contenu pertinent pour attirer les clients', 'Réaliser des paiements', 'Analyser la concurrence'],
          correctAnswer: 1,
        },
        {
          question: 'Quel est l’objectif de l’email marketing ?',
          options: ['Créer un site web', 'Envoyer des newsletters ou promotions ciblées', 'Améliorer le SEO', 'Changer de domaine'],
          correctAnswer: 1,
        },
        {
          question: 'Qu’est-ce qu’un call-to-action (CTA) ?',
          options: ['Un bouton ou lien incitant à une action', 'Une vidéo de présentation', 'Un message d’erreur', 'Un outil d’analyse'],
          correctAnswer: 0,
        },
        {
          question: 'Quel est un KPI en marketing ?',
          options: ['Un logiciel', 'Un indicateur de performance', 'Un type de contenu', 'Une extension web'],
          correctAnswer: 1,
        },
        {
          question: 'Que signifie CRM ?',
          options: ['Customer Relationship Management', 'Content Resource Marketing', 'Creative Real Market', 'Customer Revenue Model'],
          correctAnswer: 0,
        },
        {
          question: 'Quel est le rôle du branding ?',
          options: ['Créer une base de données', 'Augmenter le trafic', 'Construire l’image de marque', 'Analyser la concurrence'],
          correctAnswer: 2,
        },
        {
          question: 'Quel est le principal objectif du marketing ?',
          options: ['Créer des produits', 'Augmenter les ventes et fidéliser les clients', 'Faire des publicités uniquement', 'Envoyer des emails'],
          correctAnswer: 1,
        },
        {
          question: 'Que signifie le terme "tunnel de conversion" ?',
          options: ['Un bug informatique', 'Un processus d’achat', 'Une offre spéciale', 'Une stratégie SEO'],
          correctAnswer: 1,
        },
        {
          question: 'Quel est le rôle d’un community manager ?',
          options: ['Coder une application', 'Gérer la relation et la communication sur les réseaux sociaux', 'Créer une base de données', 'Tester des produits'],
          correctAnswer: 1,
        },
        {
          question: 'Qu’est-ce qu’un lead ?',
          options: ['Un bouton', 'Un visiteur ayant montré de l’intérêt', 'Un code promo', 'Une newsletter'],
          correctAnswer: 1,
        },
        
      ],
    };
    
    const StaticQuizComponent = () => {
      const [selectedCategory, setSelectedCategory] = useState('developpement');
      const [currentQuestion, setCurrentQuestion] = useState(0);
      const [answers, setAnswers] = useState([]);
      const [showResults, setShowResults] = useState(false);
    
      const questions = staticQuizData[selectedCategory];
    
      const handleAnswer = (index) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = index;
        setAnswers(newAnswers);
    
        const next = currentQuestion + 1;
        if (next < questions.length) {
          setCurrentQuestion(next);
        } else {
          setShowResults(true);
        }
      };
    
      const getScore = () => {
        return answers.reduce((acc, answer, idx) => {
          if (answer === questions[idx].correctAnswer) {
            return acc + 1;
          }
          return acc;
        }, 0);
      };
    
      const restartQuiz = () => {
        setAnswers([]);
        setCurrentQuestion(0);
        setShowResults(false);
      };
    
      const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        restartQuiz();
      };
    
      return (
        <Card style={{ maxWidth: 800, margin: 'auto', marginTop: 20 }}>
          <Title level={3}>Quiz sur le thème : {selectedCategory}</Title>
          <Radio.Group
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ marginBottom: 20 }}
          >
            <Radio.Button value="developpement">Développement</Radio.Button>
            <Radio.Button value="ai">Intelligence Artificielle</Radio.Button>
            <Radio.Button value="marketing">Marketing</Radio.Button>
          </Radio.Group>
    
          {!showResults ? (
            <>
              <Progress
                percent={Math.round(((currentQuestion + 1) / questions.length) * 100)}
                style={{ marginBottom: 20 }}
              />
              <Title level={4}>{questions[currentQuestion].question}</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                {questions[currentQuestion].options.map((option, index) => (
                  <Radio.Button
                    key={index}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      marginBottom: 8,
                    }}
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </Radio.Button>
                ))}
              </Space>
            </>
          ) : (
            <>
              <Title level={4}>Résultats</Title>
              <Text strong>Score : {getScore()} / {questions.length}</Text>
              {getScore() > 10 && (
                <Text type="success" style={{ display: 'block', marginTop: 10 }}>
                  🎉 Félicitations ! Vous avez réussi le quiz avec succès !
                </Text>
              )}
              <Divider />
              {questions.map((q, idx) => (
                <Card
                  key={idx}
                  type="inner"
                  title={`Question ${idx + 1}`}
                  style={{ marginBottom: 10 }}
                >
                  <Text strong>{q.question}</Text>
                  <br />
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswer;
                    const isSelected = optIdx === answers[idx];
                    const isRightAnswer = isSelected && isCorrect;
                    const isWrongAnswer = isSelected && !isCorrect;
    
                    return (
                      <div key={optIdx}>
                        <Text
                          type={isRightAnswer ? 'success' : isWrongAnswer ? 'danger' : undefined}
                        >
                          {isSelected && isRightAnswer && <CheckCircleOutlined />}{" "}
                          {isSelected && isWrongAnswer && <CloseCircleOutlined />}{" "}
                          {opt}
                          {isCorrect && !isSelected && ' (Bonne réponse)'}
                        </Text>
                      </div>
                    );
                  })}
                </Card>
              ))}
              <Divider />
              <a onClick={restartQuiz}>Recommencer le quiz</a>
            </>
          )}
        </Card>
      );
    };
    
    export default StaticQuizComponent;
    