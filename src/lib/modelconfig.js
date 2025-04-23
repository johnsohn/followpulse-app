const models = {
  imagegen:{
    name:"Image Generator AI",
    icon:"/logos/openai-black.svg",
    description:"GPT-4 is the most advanced language model from OpenAI, offering improved reasoning and broader capabilities compared to its predecessors.",
    examples:[
      "Analyze the implications of artificial intelligence on job markets.",
      "Design a sustainable urban transportation system.",
      "Explain the theory of relativity using simple analogies."
    ],
    support_image:true,
    pro:true,
    hidden:true,
  },
  gpt4:{
    name:"GPT-4o mini",
    icon:"/logos/openai-black.svg",
    description:"GPT-4 is the most advanced language model from OpenAI, offering improved reasoning and broader capabilities compared to its predecessors.",
    examples:[
      "Analyze the implications of artificial intelligence on job markets.",
      "Design a sustainable urban transportation system.",
      "Explain the theory of relativity using simple analogies."
    ],
    support_image:false,
    pro:false,
  },
  gpt4o:{
    name:"GPT-4o",
    icon:"/logos/openai-white.svg",
    description:"GPT-4o is an optimized version of GPT-4, designed for faster response times while maintaining high-quality outputs.",
    examples:[
      "Summarize the key points of climate change research.",
      "Create a marketing strategy for a new tech product.",
      "Explain the process of photosynthesis step by step."
    ],
    support_image:true,
    pro:true,
  },
  gemini:{
    name:"Google Gemini",
    icon:"/logos/gemini-blue.svg",
    description:"Google Gemini is a multimodal AI model developed by Google, capable of understanding and generating text, images, and other types of data.",
    examples:[
      "Describe the architecture of the Eiffel Tower.",
      "Explain how machine learning algorithms work.",
      "Write a short story inspired by a famous painting."
    ],
    support_image:true,
    pro:true,
  },
  claude:{
    name:"Claude",
    icon:"/logos/claude-white.svg",
    description:"Claude is an AI assistant created by Anthropic, known for its strong language understanding and generation capabilities, as well as its focus on safety and ethics.",
    examples:[
      "Discuss the ethical implications of AI in healthcare.",
      "Explain the concept of blockchain technology.",
      "Analyze the themes in George Orwell's 1984.",
    ],
    support_image:true,
    pro:true,
  },
  deepseekv3:{
    name:"DeepSeek V3",
    icon:"/logos/deepseek.svg",
    description:"DeepSeek V3 is an AI model created by DeepSeek, known for its advanced language processing abilities and efficient performance across a wide range of tasks.",
    examples:[
      "Discuss the ethical implications of AI in healthcare.",
      "Explain the concept of blockchain technology.",
      "Analyze the themes in George Orwell's 1984.",
    ],
    support_image:true,
    pro:true,
  }



};

export default models;
