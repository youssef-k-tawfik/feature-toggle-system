import { configureStore } from "@reduxjs/toolkit";

export const comments = [
  {
    id: 9389,
    username: "Abe Toulwani",
    userProfileSrc: "https://www.linkedin.com/in/abetoluwani/",
    avatarSrc:
      "https://media.licdn.com/dms/image/v2/D4E03AQHhiy7n1_AOAw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720138262693?e=1740009600&v=beta&t=xd99vw0eH2ezmbjCDODnmr983pTCujsSjOjJcQOkLRI",
    text: "Welcome to the team!",
  },
  {
    id: 4678,
    username: "Samuel Sakinbarnes",
    userProfileSrc: "https://www.linkedin.com/in/samuel-sakinbarnes-2837b5171/",
    avatarSrc:
      "https://media.licdn.com/dms/image/v2/D4D03AQEMmJtSPL8bIQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722377189606?e=1740009600&v=beta&t=1BRtZqMnZDwoNL8HOtXkwWEgo5SPxZfsMXf85x1sqNk",
    text: "Party time, Yaaaaaaaaay!",
  },
];

export const features = [
  { id: 0, name: "like", enabled: true },
  { id: 1, name: "comment", enabled: true },
  { id: 2, name: "share", enabled: true },
];

export const mockStore = configureStore({
  reducer: {
    post: (state = { comments }) => state,
    systemFeatures: (state = { features }) => state,
  },
});

