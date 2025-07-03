type PostType = {
  id: number;
  desc: string;
  img: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

type User = {
  username: string;
  name: string | null;
  id: string;
  createdAt: Date;
  email: string;
  avatar: string | null;
  cover: string | null;
  surname: string | null;
  description: string | null;
  city: string | null;
  school: string | null;
  work: string | null;
  website: string | null;
};

type FeedPostTypeConstant = PostType & {
  user: User;
  likes: { userId: string }[];
} & {
  _count: { comments: number };
};

const SocialsAdmin = {
  id: "user_123",
  username: "socials",
  email: "socials@email.com",
  avatar: "/socials.png",
  name: "Socials",
  surname: "Admin",
  description: "Socials Admin",
  city: "San Francisco",
  createdAt: new Date("2020-01-15T10:00:00Z"),
  school: null,
  work: null,
  website: null,
  cover: null,
};

export const feedPosts: FeedPostTypeConstant[] = [
  {
    id: 1,
    desc: "Excited to announce our App, Please sign up and explore new ways to connect with everyone.",
    img: "/socials.png",
    createdAt: new Date("2022-07-03T06:30:00Z"),
    updatedAt: new Date("2022-07-03T06:30:00Z"),
    userId: "user_123",
    user: SocialsAdmin,
    likes: [
      { userId: "user_456" },
      { userId: "user_789" },
      { userId: "user_101" },
      { userId: "user_202" },
      { userId: "user_456" },
      { userId: "user_789" },
      { userId: "user_101" },
      { userId: "user_202" },
    ],
    _count: { comments: 1 },
  },
  {
    id: 2,
    desc: "Beautiful sunset from my balcony tonight 🌅",
    img: "https://images.pexels.com/photos/30051929/pexels-photo-30051929.jpeg",
    createdAt: new Date("2022-07-03T06:30:00Z"),
    updatedAt: new Date("2022-07-03T06:30:00Z"),
    userId: "user_123",
    user: SocialsAdmin,
    likes: [
      { userId: "user_456" },
      { userId: "user_789" },
      { userId: "user_101" },
    ],
    _count: { comments: 1 },
  },
  {
    id: 3,
    desc: "Just finished my morning workout! Feeling energized and ready to tackle the day 💪",
    img: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg",
    createdAt: new Date("2022-07-03T06:30:00Z"),
    updatedAt: new Date("2022-07-03T06:30:00Z"),
    userId: "user_123",
    user: SocialsAdmin,
    likes: [
      { userId: "user_101" },
      { userId: "user_456" },
      { userId: "user_789" },
      { userId: "user_101" },
      { userId: "user_202" },
    ],
    _count: { comments: 1 },
  },
  {
    id: 4,
    desc: "Homemade pizza night! 🍕 Nothing beats cooking with friends and family.",
    img: "https://images.pexels.com/photos/32753298/pexels-photo-32753298.jpeg",
    createdAt: new Date("2022-07-03T06:30:00Z"),
    updatedAt: new Date("2022-07-03T06:30:00Z"),
    userId: "user_123",
    user: SocialsAdmin,
    likes: [
      { userId: "user_202" },
      { userId: "user_456" },
      { userId: "user_789" },
      { userId: "user_101" },
    ],
    _count: { comments: 0 },
  },
  {
    id: 5,
    desc: "Weekend hiking adventure complete! The views from the summit were absolutely breathtaking. Nature therapy at its finest 🏔️",
    img: "https://images.pexels.com/photos/868097/pexels-photo-868097.jpeg",
    createdAt: new Date("2022-07-03T06:30:00Z"),
    updatedAt: new Date("2022-07-03T06:30:00Z"),
    userId: "user_123",
    user: SocialsAdmin,
    likes: [{ userId: "user_223" }],
    _count: { comments: 0 },
  },
];
