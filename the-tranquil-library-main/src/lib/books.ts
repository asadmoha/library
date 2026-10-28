export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
  topic: string;
  description: string;
};

const raw: [string, string, number, number, string, string][] = [
  ["Atomic Habits", "James Clear", 2018, 320, "Self Improvement", "A practical guide to building good habits and breaking bad ones through tiny, consistent changes."],
  ["The 7 Habits of Highly Effective People", "Stephen R. Covey", 1989, 381, "Self Improvement", "A principle-centered approach to personal and professional effectiveness."],
  ["Mindset", "Carol S. Dweck", 2006, 276, "Self Improvement", "How a growth mindset shapes success in learning, work and relationships."],
  ["The Power of Now", "Eckhart Tolle", 1997, 236, "Self Improvement", "A guide to spiritual awakening through living fully in the present moment."],
  ["Deep Work", "Cal Newport", 2016, 296, "Self Improvement", "Rules for focused success in a distracted world."],
  ["How to Win Friends and Influence People", "Dale Carnegie", 1936, 291, "Self Improvement", "Timeless advice on communication, kindness and getting along with people."],
  ["Pride and Prejudice", "Jane Austen", 1813, 432, "Love", "Elizabeth Bennet and Mr. Darcy navigate pride, class and true affection."],
  ["The Notebook", "Nicholas Sparks", 1996, 214, "Love", "A tender story of enduring love told across decades."],
  ["Jane Eyre", "Charlotte Brontë", 1847, 532, "Love", "An orphaned governess finds love and independence at Thornfield Hall."],
  ["The Art of Loving", "Erich Fromm", 1956, 133, "Love", "A reflection on love as a skill that requires knowledge and effort."],
  ["Me Before You", "Jojo Moyes", 2012, 369, "Love", "An unlikely bond between a caregiver and a man who has lost his will to live."],
  ["The Five Love Languages", "Gary Chapman", 1992, 204, "Love", "Understanding how people give and receive love differently."],
  ["The Sealed Nectar", "Safiur Rahman Mubarakpuri", 1979, 590, "Religion", "An award-winning biography of the Prophet Muhammad ﷺ."],
  ["Mere Christianity", "C. S. Lewis", 1952, 227, "Religion", "A reasoned case for the core beliefs of the Christian faith."],
  ["The Bhagavad Gita (Easwaran)", "Eknath Easwaran", 1985, 296, "Religion", "An accessible translation of the classic Hindu scripture on duty and devotion."],
  ["Don't Be Sad", "Aaidh ibn Abdullah al-Qarni", 2003, 456, "Religion", "Gentle reminders drawn from faith to overcome sorrow and anxiety."],
  ["The Art of Happiness", "Dalai Lama & Howard Cutler", 1998, 336, "Religion", "Buddhist wisdom on finding lasting contentment."],
  ["Purification of the Heart", "Hamza Yusuf", 2004, 220, "Religion", "A classical text on healing spiritual diseases of the heart."],
  ["Sapiens", "Yuval Noah Harari", 2011, 443, "History", "A brief history of humankind from the Stone Age to today."],
  ["Guns, Germs, and Steel", "Jared Diamond", 1997, 480, "History", "Why some societies conquered others, explained through geography."],
  ["The Diary of a Young Girl", "Anne Frank", 1947, 283, "History", "The moving wartime diary of a Jewish girl hiding in Amsterdam."],
  ["The Silk Roads", "Peter Frankopan", 2015, 636, "History", "A new history of the world told from the East."],
  ["Team of Rivals", "Doris Kearns Goodwin", 2005, 944, "History", "Lincoln's political genius in uniting his former rivals."],
  ["A Brief History of Time", "Stephen Hawking", 1988, 212, "Science", "Black holes, the Big Bang and the nature of time, explained simply."],
  ["Cosmos", "Carl Sagan", 1980, 396, "Science", "A poetic journey through the universe and our place in it."],
  ["The Selfish Gene", "Richard Dawkins", 1976, 360, "Science", "Evolution seen from the perspective of the gene."],
  ["The Gene", "Siddhartha Mukherjee", 2016, 592, "Science", "An intimate history of heredity and genetics."],
  ["Thinking, Fast and Slow", "Daniel Kahneman", 2011, 499, "Psychology", "The two systems that drive the way we think and decide."],
  ["Man's Search for Meaning", "Viktor E. Frankl", 1946, 165, "Psychology", "A Holocaust survivor's insight into finding purpose amid suffering."],
  ["Quiet", "Susan Cain", 2012, 333, "Psychology", "The power of introverts in a world that can't stop talking."],
  ["The Body Keeps the Score", "Bessel van der Kolk", 2014, 464, "Psychology", "How trauma reshapes body and brain, and paths to healing."],
  ["Meditations", "Marcus Aurelius", 180, 254, "Philosophy", "Private reflections of a Roman emperor on Stoic virtue."],
  ["The Republic", "Plato", -375, 416, "Philosophy", "A foundational dialogue on justice and the ideal state."],
  ["Tao Te Ching", "Lao Tzu", -400, 160, "Philosophy", "Short verses on harmony, simplicity and the Way."],
  ["Letters from a Stoic", "Seneca", 65, 254, "Philosophy", "Letters of practical wisdom on living well."],
  ["To Kill a Mockingbird", "Harper Lee", 1960, 336, "Fiction", "Justice and innocence in a small Southern town."],
  ["The Alchemist", "Paulo Coelho", 1988, 208, "Fiction", "A shepherd's journey to follow his dreams."],
  ["1984", "George Orwell", 1949, 328, "Fiction", "A chilling vision of totalitarian surveillance."],
  ["Things Fall Apart", "Chinua Achebe", 1958, 209, "Fiction", "The life of Okonkwo and the arrival of colonialism in Nigeria."],
  ["The Kite Runner", "Khaled Hosseini", 2003, 371, "Fiction", "Friendship, betrayal and redemption in Afghanistan."],
  ["Rich Dad Poor Dad", "Robert T. Kiyosaki", 1997, 336, "Finance", "Lessons on money and financial independence."],
  ["The Psychology of Money", "Morgan Housel", 2020, 256, "Finance", "Timeless lessons on wealth, greed and happiness."],
  ["The Intelligent Investor", "Benjamin Graham", 1949, 640, "Finance", "The definitive book on value investing."],
  ["Long Walk to Freedom", "Nelson Mandela", 1994, 656, "Biography", "Mandela's autobiography, from childhood to presidency."],
  ["The Autobiography of Malcolm X", "Malcolm X & Alex Haley", 1965, 466, "Biography", "A powerful story of transformation and faith."],
  ["Steve Jobs", "Walter Isaacson", 2011, 656, "Biography", "The life of Apple's visionary co-founder."],
  ["Becoming", "Michelle Obama", 2018, 448, "Biography", "The former First Lady's memoir of growth and purpose."],
  ["The Prophet", "Kahlil Gibran", 1923, 107, "Poetry", "Lyrical essays on love, work, joy and sorrow."],
  ["The Essential Rumi", "Rumi (trans. Coleman Barks)", 1995, 302, "Poetry", "Ecstatic poems of divine love and longing."],
  ["Milk and Honey", "Rupi Kaur", 2014, 208, "Poetry", "Poems of love, loss, trauma and healing."],
];

export const books: Book[] = raw.map(([title, author, year, pages, topic, description], i) => ({
  id: i + 1, title, author, year, pages, topic, description,
}));

export const topics = Array.from(new Set(books.map((b) => b.topic)));

export const formatYear = (y: number) => (y < 0 ? `${-y} BC` : `${y}`);
