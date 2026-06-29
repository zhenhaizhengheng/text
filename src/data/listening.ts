import type { ListeningCategory, ListeningItem } from '../types';

export const listeningCategories: ListeningCategory[] = [
  {
    id: 'conversation',
    name: '日常对话',
    icon: '💬',
    color: 'from-purple-500 to-pink-500',
    description: '生活化场景对话，提升日常听力理解能力',
    count: 24,
  },
  {
    id: 'news',
    name: '新闻听力',
    icon: '📰',
    color: 'from-blue-500 to-cyan-500',
    description: 'VOA、BBC等新闻素材，锻炼正式语境听力',
    count: 18,
  },
  {
    id: 'story',
    name: '故事听力',
    icon: '📚',
    color: 'from-amber-500 to-orange-500',
    description: '有趣的故事和短文，在乐趣中提升听力',
    count: 32,
  },
];

export const listeningItems: ListeningItem[] = [
  {
    id: 'listen-1',
    title: '在咖啡店点单',
    category: 'conversation',
    level: 'beginner',
    duration: 65,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    transcript: `A: Good morning! Welcome to Coffee Heaven. What can I get for you today?
B: Hi, I'd like a medium latte, please.
A: Certainly! Would you like that with oat milk or regular milk?
B: Oat milk, please. And can I add an extra shot of espresso?
A: Sure thing! Anything else for you?
B: Yes, I'll also have a blueberry muffin.
A: Great choice! That'll be $7.50. You can pick up your order at the counter over there.
B: Thank you very much!
A: You're welcome! Have a wonderful day!`,
    translation: `A：早上好！欢迎来到咖啡天堂。今天想喝点什么？
B：你好，我要一杯中杯拿铁。
A：好的！您想要燕麦奶还是普通牛奶？
B：燕麦奶，谢谢。可以再加一份浓缩咖啡吗？
A：当然可以！还需要别的吗？
B：是的，我还要一个蓝莓松饼。
A：好选择！一共7.50美元。您可以在那边的取餐台取餐。
B：非常感谢！
A：不客气！祝您今天愉快！`,
    questions: [
      {
        id: 'q1',
        question: '这位顾客点了什么咖啡？',
        options: ['美式咖啡', '拿铁咖啡', '卡布奇诺', '摩卡咖啡'],
        correctAnswer: 1,
        explanation: '顾客明确说 "I\'d like a medium latte"，即中杯拿铁。',
      },
      {
        id: 'q2',
        question: '顾客选择了什么牛奶？',
        options: ['普通牛奶', '脱脂牛奶', '燕麦奶', '杏仁奶'],
        correctAnswer: 2,
        explanation: '顾客回答 "Oat milk, please"，选择了燕麦奶。',
      },
      {
        id: 'q3',
        question: '顾客总共点了几样东西？',
        options: ['一样', '两样', '三样', '四样'],
        correctAnswer: 1,
        explanation: '顾客点了一杯拿铁（加浓缩咖啡是附加的）和一个蓝莓松饼，共两样。',
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=450&fit=crop',
  },
  {
    id: 'listen-2',
    title: '机场登机手续',
    category: 'conversation',
    level: 'intermediate',
    duration: 90,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    transcript: `A: Good afternoon, sir. May I see your passport and boarding pass, please?
B: Sure, here you go. I'm flying to Tokyo on flight JL007.
A: Thank you. Is this all your luggage?
B: Yes, just this one suitcase and a carry-on bag.
A: I see. Would you prefer a window seat or an aisle seat?
B: A window seat, please. I love looking at the clouds.
A: No problem. I've assigned you seat 23A. Your boarding time is at 3:45 PM from gate 15.
B: Great, thank you. How long is the flight?
A: The flight is about 11 hours. We'll be serving dinner and breakfast on board.
B: Perfect. Is there a lounge I can use before boarding?
A: Yes, our business class lounge is on the second floor, near gate 10. You're welcome to use it.
B: Wonderful, thank you so much!
A: You're welcome. Have a pleasant flight!`,
    translation: `A：下午好，先生。请出示您的护照和登机牌。
B：好的，给你。我乘坐JL007航班去东京。
A：谢谢。这些是您所有的行李吗？
B：是的，只有这个行李箱和一个随身包。
A：好的。您想要靠窗座位还是靠过道座位？
B：靠窗座位，谢谢。我喜欢看云。
A：没问题。我给您安排了23A座位。登机时间是下午3:45，在15号登机口。
B：太好了，谢谢。飞行时间多长？
A：大约11小时。机上会提供晚餐和早餐。
B：太好了。登机前有休息室可以用吗？
A：有的，我们的商务舱休息室在二楼，10号登机口附近。您可以使用。
B：太棒了，非常感谢！
A：不客气。祝您旅途愉快！`,
    questions: [
      {
        id: 'q1',
        question: '这位旅客要去哪里？',
        options: ['首尔', '东京', '北京', '上海'],
        correctAnswer: 1,
        explanation: '旅客说 "I\'m flying to Tokyo on flight JL007"。',
      },
      {
        id: 'q2',
        question: '旅客的座位号是多少？',
        options: ['15A', '23A', '10A', '7A'],
        correctAnswer: 1,
        explanation: '工作人员说 "I\'ve assigned you seat 23A"。',
      },
      {
        id: 'q3',
        question: '飞行时间大约是多久？',
        options: ['8小时', '10小时', '11小时', '13小时'],
        correctAnswer: 2,
        explanation: '工作人员说 "The flight is about 11 hours"。',
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=450&fit=crop',
  },
  {
    id: 'listen-3',
    title: '科技新闻：人工智能的新突破',
    category: 'news',
    level: 'advanced',
    duration: 120,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    transcript: `In a groundbreaking development announced earlier this week, researchers at a leading technology institute have unveiled a new artificial intelligence system that demonstrates unprecedented capabilities in natural language understanding and generation.

The new system, dubbed "Nova-3," represents a significant leap forward in AI technology. According to the research team, Nova-3 can comprehend complex texts, generate human-like responses, and even engage in nuanced discussions on topics ranging from quantum physics to literary criticism.

Dr. Sarah Chen, the lead researcher on the project, explained that the key innovation lies in a novel architecture that allows the model to reason more effectively. "Unlike previous models that primarily rely on pattern recognition, Nova-3 can actually think through problems step by step," she said during a press conference.

Industry experts have hailed the announcement as a major milestone. However, some ethicists have raised concerns about the potential misuse of such powerful technology. The research team has emphasized that they are committed to responsible AI development and have implemented multiple safety measures.

The system is expected to be rolled out in limited beta testing next month, with a full release scheduled for early next year.`,
    translation: `在本周早些时候宣布的一项突破性进展中，一家顶尖技术研究所的研究人员推出了一款新的人工智能系统，该系统在自然语言理解和生成方面展现出前所未有的能力。

这个被称为"Nova-3"的新系统代表了人工智能技术的重大飞跃。据研究团队介绍，Nova-3能够理解复杂文本，生成类人回应，甚至可以参与从量子物理到文学批评等各种话题的细致讨论。

项目首席研究员Sarah Chen博士解释说，关键创新在于一种新颖的架构，使模型能够更有效地推理。"与主要依赖模式识别的以往模型不同，Nova-3实际上可以逐步思考问题，"她在新闻发布会上说。

行业专家称赞这一宣布是一个重要的里程碑。然而，一些伦理学家对这种强大技术的潜在滥用提出了担忧。研究团队强调，他们致力于负责任的人工智能开发，并已实施多项安全措施。

该系统预计将于下月进行有限的beta测试，并计划在明年初全面发布。`,
    questions: [
      {
        id: 'q1',
        question: '新的人工智能系统叫什么名字？',
        options: ['Alpha-3', 'Nova-3', 'Neo-3', 'Next-3'],
        correctAnswer: 1,
        explanation: '文章中提到 "The new system, dubbed \'Nova-3\'"。',
      },
      {
        id: 'q2',
        question: '根据文章，Nova-3的主要创新是什么？',
        options: ['更快的处理速度', '更大的存储容量', '更有效的推理能力', '更低的能耗'],
        correctAnswer: 2,
        explanation: 'Dr. Chen说"Nova-3 can actually think through problems step by step"，这指的是推理能力。',
      },
      {
        id: 'q3',
        question: '系统预计何时全面发布？',
        options: ['下个月', '今年年底', '明年初', '明年年底'],
        correctAnswer: 2,
        explanation: '文章最后说 "with a full release scheduled for early next year"。',
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
  },
  {
    id: 'listen-4',
    title: '小王子的故事',
    category: 'story',
    level: 'beginner',
    duration: 100,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    transcript: `Once upon a time, there was a little prince who lived on a very small planet. His planet was barely bigger than a house, and it had three volcanoes and a beautiful rose.

Every morning, the little prince would water his rose and watch the sunset. He loved his rose very much, but the rose was vain and proud. She always asked the little prince to do things for her.

One day, the little prince decided to leave his planet and travel the universe. He visited many planets and met many interesting people. He met a king, a businessman, a lamplighter, and a geographer.

On Earth, the little prince met a fox. The fox taught him that "you become responsible forever for what you've tamed." The little prince realized that his rose was special because he had tamed her, and she had tamed him.

After many adventures, the little prince missed his rose deeply. He knew he had to go back to his planet, because he was responsible for her.`,
    translation: `很久以前，有一个小王子，他住在一个非常小的星球上。他的星球比房子大不了多少，上面有三座火山和一朵美丽的玫瑰。

每天早上，小王子都会给玫瑰浇水，然后看日落。他非常爱他的玫瑰，但玫瑰既虚荣又骄傲。她总是让小王子为她做这做那。

有一天，小王子决定离开他的星球，去宇宙旅行。他访问了许多星球，遇到了许多有趣的人。他遇到了一位国王、一位商人、一位点灯人和一位地理学家。

在地球上，小王子遇到了一只狐狸。狐狸告诉他："你要永远为你驯化的东西负责。"小王子意识到，他的玫瑰是特别的，因为他驯化了她，她也驯化了他。

经过许多冒险后，小王子深深地思念他的玫瑰。他知道他必须回到自己的星球，因为他要对她负责。`,
    questions: [
      {
        id: 'q1',
        question: '小王子的星球上有什么？',
        options: ['两座火山和一朵玫瑰', '三座火山和一朵玫瑰', '三座火山和两棵树', '一条河和一朵玫瑰'],
        correctAnswer: 1,
        explanation: '故事中说 "it had three volcanoes and a beautiful rose"。',
      },
      {
        id: 'q2',
        question: '小王子在地球上遇到了谁？',
        options: ['一只猫', '一只鸟', '一只狐狸', '一只狗'],
        correctAnswer: 2,
        explanation: '"On Earth, the little prince met a fox."',
      },
      {
        id: 'q3',
        question: '狐狸教会了小王子什么？',
        options: ['如何跑得快', '要为自己驯化的东西负责', '如何找到回家的路', '如何交朋友'],
        correctAnswer: 1,
        explanation: '狐狸说 "you become responsible forever for what you\'ve tamed"。',
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=450&fit=crop',
  },
  {
    id: 'listen-5',
    title: '天气预报',
    category: 'news',
    level: 'beginner',
    duration: 45,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    transcript: `Good morning, everyone! Here's today's weather forecast.

It will be a beautiful sunny day with clear skies all day. The high temperature will be 28 degrees Celsius, and the low will be 18 degrees. There's a light breeze coming from the west.

Tomorrow will be partly cloudy in the morning, with a chance of rain in the afternoon. Don't forget to bring your umbrella!

Have a great day, everyone!`,
    translation: `大家早上好！这是今天的天气预报。

今天将是阳光明媚的一天，全天晴朗。最高气温28摄氏度，最低气温18度。有轻微的西风。

明天上午局部多云，下午可能有雨。别忘了带伞！

祝大家今天愉快！`,
    questions: [
      {
        id: 'q1',
        question: '今天的天气怎么样？',
        options: ['下雨', '多云', '晴朗', '刮风'],
        correctAnswer: 2,
        explanation: '"It will be a beautiful sunny day with clear skies all day."',
      },
      {
        id: 'q2',
        question: '今天的最高气温是多少？',
        options: ['18度', '25度', '28度', '30度'],
        correctAnswer: 2,
        explanation: '"The high temperature will be 28 degrees Celsius"。',
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=450&fit=crop',
  },
  {
    id: 'listen-6',
    title: ' TED演讲：创造力的力量',
    category: 'story',
    level: 'advanced',
    duration: 150,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    transcript: `Good morning, everyone. Today I want to talk about something we all have, but few of us truly harness: creativity.

When I was a child, I thought creativity was just for artists, musicians, and writers. I thought you were either born with it or you weren't. But as I grew older, I realized that creativity is a muscle. It's something we can all develop with practice.

Let me share a story. A few years ago, I was stuck in a dead-end job, feeling unfulfilled. One day, I decided to take a pottery class. I had never touched clay before, and I was terrible at it. My first pots were lumpy, uneven, and frankly, ugly. But something unexpected happened. As I kept showing up every week, I started to get better. More importantly, I started to see the world differently.

That pottery class changed my life. It taught me that creativity isn't about making something perfect. It's about the process of making, of experimenting, of failing and trying again.

Here's what I've learned: everyone is creative. You just have to give yourself permission to be bad at something before you can be good at it. So pick up a paintbrush, write that first sentence, or try that recipe you've been curious about. Your creative self is waiting to be discovered.

Thank you.`,
    translation: `大家早上好。今天我想谈谈我们都拥有的，但很少有人真正利用的东西：创造力。

当我还是个孩子的时候，我以为创造力只属于艺术家、音乐家和作家。我以为你要么天生就有，要么就没有。但随着年龄增长，我意识到创造力是一块肌肉。是我们都可以通过练习来发展的东西。

让我分享一个故事。几年前，我困在一份没有前途的工作中，感到很不满足。有一天，我决定去上陶艺课。我以前从未碰过粘土，而且我做得非常糟糕。我做的第一个罐子疙疙瘩瘩，凹凸不平，坦白说，很丑。但意想不到的事情发生了。当我每周都坚持去的时候，我开始变得更好了。更重要的是，我开始用不同的眼光看世界。

那堂陶艺课改变了我的生活。它教会我，创造力不是要做出完美的东西。而是在于制作的过程，实验的过程，失败和再尝试的过程。

这是我学到的：每个人都有创造力。你只需要允许自己在擅长某件事之前先做得糟糕。所以拿起画笔，写下第一句话，或者尝试你一直好奇的那个食谱。你有创造力的自我正等待被发现。

谢谢。`,
    questions: [
      {
        id: 'q1',
        question: '演讲者小时候认为创造力是什么？',
        options: ['每个人都有的能力', '只属于艺术家等特定人群', '可以通过学习获得', '不重要的东西'],
        correctAnswer: 1,
        explanation: '"I thought creativity was just for artists, musicians, and writers."',
      },
      {
        id: 'q2',
        question: '演讲者参加了什么课程？',
        options: ['绘画课', '音乐课', '陶艺课', '写作课'],
        correctAnswer: 2,
        explanation: '"I decided to take a pottery class"。',
      },
      {
        id: 'q3',
        question: '演讲者认为创造力的关键是什么？',
        options: ['天赋', '完美的结果', '过程和实践', '别人的认可'],
        correctAnswer: 2,
        explanation: '演讲者说创造力在于制作、实验、失败和再尝试的过程。',
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=450&fit=crop',
  },
];

export default listeningItems;
