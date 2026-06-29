import type { SpeakingCategory, SpeakingLesson, SpeakingSentence, ScoreFeedback } from '../types';

export const speakingCategories: SpeakingCategory[] = [
  {
    id: 'daily',
    name: '日常交流',
    icon: '🗣️',
    color: 'from-purple-500 to-pink-500',
    description: '日常生活中的常用对话和表达',
    count: 30,
  },
  {
    id: 'business',
    name: '商务英语',
    icon: '💼',
    color: 'from-blue-500 to-cyan-500',
    description: '职场场景中的专业表达和沟通',
    count: 25,
  },
  {
    id: 'travel',
    name: '旅行英语',
    icon: '✈️',
    color: 'from-amber-500 to-orange-500',
    description: '出国旅行必备的实用表达',
    count: 20,
  },
  {
    id: 'interview',
    name: '面试英语',
    icon: '📋',
    color: 'from-green-500 to-emerald-500',
    description: '求职面试中的常见问题和回答',
    count: 18,
  },
];

export const speakingLessons: SpeakingLesson[] = [
  {
    id: 'speak-1',
    title: '问候与自我介绍',
    category: 'daily',
    level: 'beginner',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop',
    sentences: [
      {
        id: 's1',
        sentence: 'Hello, nice to meet you!',
        translation: '你好，很高兴认识你！',
        phonetic: '/həˈloʊ, naɪs tuː miːt juː/',
        difficulty: 1,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        id: 's2',
        sentence: 'My name is Li Ming, and I come from Beijing.',
        translation: '我叫李明，来自北京。',
        phonetic: '/maɪ neɪm ɪz liː mɪŋ, ænd aɪ kʌm frɒm beɪˈdʒɪŋ/',
        difficulty: 1,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
      {
        id: 's3',
        sentence: 'How are you doing today?',
        translation: '你今天过得怎么样？',
        phonetic: '/haʊ ɑːr juː ˈduːɪŋ təˈdeɪ/',
        difficulty: 1,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
      {
        id: 's4',
        sentence: "I'm doing great, thanks for asking!",
        translation: '我过得很好，谢谢你的关心！',
        phonetic: '/aɪm ˈduːɪŋ ɡreɪt, θæŋks fɔːr ˈæskɪŋ/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      },
      {
        id: 's5',
        sentence: 'What do you do for a living?',
        translation: '你是做什么工作的？',
        phonetic: '/wɒt duː juː duː fɔːr ə ˈlɪvɪŋ/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },
    ],
  },
  {
    id: 'speak-2',
    title: '在餐厅点餐',
    category: 'daily',
    level: 'intermediate',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=450&fit=crop',
    sentences: [
      {
        id: 's1',
        sentence: 'Do you have any recommendations for the main course?',
        translation: '你有什么主菜推荐吗？',
        phonetic: '/duː juː hæv ˈeni ˌrekəmenˈdeɪʃənz fɔːr ðə meɪn kɔːrs/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      },
      {
        id: 's2',
        sentence: "I'd like a medium-rare steak, please.",
        translation: '我要一份五分熟的牛排，谢谢。',
        phonetic: '/aɪd laɪk ə ˈmiːdiəm reər steɪk, pliːz/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      },
      {
        id: 's3',
        sentence: 'Could we have the bill, please?',
        translation: '请给我们账单好吗？',
        phonetic: '/kʊd wiː hæv ðə bɪl, pliːz/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      },
      {
        id: 's4',
        sentence: 'The food was absolutely delicious!',
        translation: '食物真的太美味了！',
        phonetic: '/ðə fuːd wɒz ˈæbsəluːtli dɪˈlɪʃəs/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
      },
    ],
  },
  {
    id: 'speak-3',
    title: '职场会议开场白',
    category: 'business',
    level: 'intermediate',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    sentences: [
      {
        id: 's1',
        sentence: 'Good morning, everyone. Thank you for coming today.',
        translation: '大家早上好。感谢大家今天来参加。',
        phonetic: '/ɡʊd ˈmɔːrnɪŋ, ˈevriwʌn. θæŋk juː fɔːr ˈkʌmɪŋ təˈdeɪ/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
      },
      {
        id: 's2',
        sentence: "Today, we'll be discussing our marketing strategy for next quarter.",
        translation: '今天，我们将讨论下一季度的营销策略。',
        phonetic: '/təˈdeɪ, wiːl biː dɪˈskʌsɪŋ ˈaʊər ˈmɑːrkɪtɪŋ ˈstrætədʒi fɔːr nekst ˈkwɔːrtər/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
      },
      {
        id: 's3',
        sentence: "Let's start by going over the agenda for today's meeting.",
        translation: '让我们先看看今天会议的议程。',
        phonetic: '/lets stɑːrt baɪ ˈɡoʊɪŋ ˈoʊvər ði əˈdʒendə fɔːr təˈdeɪz ˈmiːtɪŋ/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
      },
      {
        id: 's4',
        sentence: 'Does anyone have any questions before we move on?',
        translation: '在我们继续之前，有人有问题吗？',
        phonetic: '/dʌz ˈeniwʌn hæv ˈeni ˈkwestʃənz bɪˈfɔːr wiː muːv ɑːn/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
      },
    ],
  },
  {
    id: 'speak-4',
    title: '在机场',
    category: 'travel',
    level: 'beginner',
    coverImage: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&h=450&fit=crop',
    sentences: [
      {
        id: 's1',
        sentence: "Where is the check-in counter for flight CA123?",
        translation: 'CA123航班的值机柜台在哪里？',
        phonetic: '/weər ɪz ðə ˈtʃek ɪn ˈkaʊntər fɔːr flaɪt siː eɪ wʌn tuː θriː/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
      },
      {
        id: 's2',
        sentence: 'I have one bag to check in and one carry-on.',
        translation: '我有一个托运行李和一个随身行李。',
        phonetic: '/aɪ hæv wʌn bæɡ tuː tʃek ɪn ænd wʌn ˈkæri ɒn/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
      },
      {
        id: 's3',
        sentence: 'Could you tell me where the nearest restroom is?',
        translation: '你能告诉我最近的洗手间在哪里吗？',
        phonetic: '/kʊd juː tel miː weər ðə ˈnɪərɪst ˈrestruːm ɪz/',
        difficulty: 2,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
      },
    ],
  },
  {
    id: 'speak-5',
    title: '面试自我介绍',
    category: 'interview',
    level: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=450&fit=crop',
    sentences: [
      {
        id: 's1',
        sentence: "Thank you for giving me this opportunity to introduce myself.",
        translation: '感谢您给我这个自我介绍的机会。',
        phonetic: '/θæŋk juː fɔːr ˈɡɪvɪŋ miː ðɪs ˌɒpərˈtjuːnəti tuː ˌɪntrəˈdjuːs maɪˈself/',
        difficulty: 4,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        id: 's2',
        sentence: "I have five years of experience in software development.",
        translation: '我有五年的软件开发经验。',
        phonetic: '/aɪ hæv faɪv jɪərz əv ɪkˈspɪəriəns ɪn ˈsɒftweər dɪˈveləpmənt/',
        difficulty: 3,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
      {
        id: 's3',
        sentence: "I'm particularly skilled in project management and team leadership.",
        translation: '我在项目管理和团队领导方面特别擅长。',
        phonetic: '/aɪm pərˈtɪkjələrli skɪld ɪn ˈprɒdʒekt ˈmænɪdʒmənt ænd tiːm ˈliːdərʃɪp/',
        difficulty: 4,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
      {
        id: 's4',
        sentence: 'I am confident that I can contribute significantly to your team.',
        translation: '我有信心能为您的团队做出重大贡献。',
        phonetic: '/aɪ æm ˈkɒnfɪdənt ðæt aɪ kæn kənˈtrɪbjuːt sɪɡˈnɪfɪkəntli tuː jɔːr tiːm/',
        difficulty: 4,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      },
    ],
  },
  {
    id: 'speak-6',
    title: '电话商务沟通',
    category: 'business',
    level: 'advanced',
    coverImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=450&fit=crop',
    sentences: [
      {
        id: 's1',
        sentence: 'Hello, this is Wang Tao from ABC Company. May I speak to Mr. Smith, please?',
        translation: '你好，我是ABC公司的王涛。请问我可以和史密斯先生通话吗？',
        phonetic: '/həˈloʊ, ðɪs ɪz wɑːŋ taʊ frɒm eɪ biː siː ˈkʌmpəni. meɪ aɪ spiːk tuː ˈmɪstər smɪθ, pliːz/',
        difficulty: 4,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },
      {
        id: 's2',
        sentence: "I'm calling to follow up on the proposal we sent last week.",
        translation: '我打电话来是想跟进我们上周发送的方案。',
        phonetic: '/aɪm ˈkɔːlɪŋ tuː ˈfɒloʊ ʌp ɑːn ðə prəˈpəʊzl wiː sent lɑːst wiːk/',
        difficulty: 4,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      },
      {
        id: 's3',
        sentence: 'Could you please ask him to return my call at his earliest convenience?',
        translation: '请您让他在方便时尽早给我回电话好吗？',
        phonetic: '/kʊd juː pliːz ɑːsk hɪm tuː rɪˈtɜːrn maɪ kɔːl æt hɪz ˈɜːrliəst kənˈviːniəns/',
        difficulty: 5,
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      },
    ],
  },
];

export function generateScoreFeedback(sentence: SpeakingSentence): ScoreFeedback {
  void sentence;
  const baseScore = 60 + Math.floor(Math.random() * 35);
  const pronunciation = Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5);
  const fluency = Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5);
  const completeness = Math.min(100, baseScore + Math.floor(Math.random() * 10) - 5);
  const overall = Math.round((pronunciation + fluency + completeness) / 3);

  const allTips = [
    '注意单词重音的位置，可以多听原音对比',
    '语速可以再放慢一些，确保每个音节都清晰',
    '句子的语调可以更有起伏，听起来更自然',
    '注意元音的发音长度，短元音要短促有力',
    '辅音结尾要清晰，不要吞音',
    '连读和弱读可以让口语更地道',
    '注意句子的节奏感，意群之间适当停顿',
    'th音要咬舌，不要发成s或z',
  ];

  const tips = allTips
    .sort(() => Math.random() - 0.5)
    .slice(0, 2 + Math.floor(Math.random() * 2));

  return {
    overall,
    pronunciation,
    fluency,
    completeness,
    tips,
  };
}

export default speakingLessons;
