import { AuditLogType } from "@/types/auditLogType";
import { CommentType } from "@/types/commentType";
import { FeatureType } from "@/types/featureType";
import { configureStore } from "@reduxjs/toolkit";

export const comments: CommentType[] = [
  {
    id: 9389,
    username: "Abe Toulwani",
    userProfileSrc: "https://www.linkedin.com/in/abetoluwani/",
    avatarSrc:
      "https://ca.slack-edge.com/T05C2070079-U077BFHEUDA-a61aa9fee872-512",
    text: "Welcome to the team!",
  },
  {
    id: 4678,
    username: "ZygeSam",
    userProfileSrc: "https://www.linkedin.com/in/samuel-sakinbarnes-2837b5171/",
    avatarSrc:
      "https://ca.slack-edge.com/T05C2070079-U06M4K8DYNS-g6fada8643b7-512",
    text: "Party time, Yaaaaaaaaay!",
  },
];

export const features: FeatureType[] = [
  {
    id: "ert-erter-bvnv",
    name: "like",
    description: "This feature allows users to like a post",
    enabled: true,
  },
  {
    id: "nkoldfgs-wefnlk",
    name: "comment",
    description: "This feature allows users to comment on a post",
    enabled: true,
  },
  {
    id: "qwe-qwe",
    name: "share",
    description: "This feature allows users to share a post",
    enabled: true,
  },
];

export const token: string = "testToken";

const now = new Date();
export const auditLogs: AuditLogType[] = [
  {
    id: "6000",
    featureName: "like",
    previousState: true,
    newState: false,
    changedBy: "admin",
    timestamp: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`,
  },
  {
    id: "9833",
    featureName: "comment",
    previousState: true,
    newState: false,
    changedBy: "admin",
    timestamp: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`,
  },
  {
    id: "1244",
    featureName: "share",
    previousState: true,
    newState: false,
    changedBy: "admin",
    timestamp: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`,
  },
];

export const mockStore = configureStore({
  reducer: {
    user: (state = { userToken: token }) => state,
    post: (state = { comments }) => state,
    systemFeatures: (state = { features, auditLogs }) => state,
  },
});
