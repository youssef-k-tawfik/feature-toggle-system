import Avatar from "@/components/Avatar/Avatar";
import Comments from "@/components/CommentsSection/CommentsSection";
import Features from "@/components/Features/Features";
import LikesCounter from "@/components/PostStatistics/PostStatistics";
import SettingsButton from "@/components/SettingsFixedButton/SettingsFixedButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen py-10">
      <div className="bg-[#1b1f23]  rounded-lg p-4 max-w-md w-full">
        {/* Pose Header */}
        <div className="flex items-center mb-4">
          <Avatar src="https://media.licdn.com/dms/image/v2/D4E03AQGvGYvTTygpBw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731563248801?e=1740009600&v=beta&t=h0H9mB5t8e6UMzovKJPnJDu34wA8VMRIKG0VRHcvBfQ" />
          <div className="ml-3">
            <Link
              href={"https://www.linkedin.com/in/youssef-k-tawfik/"}
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
            >
              Youssef Tawfik
            </Link>
            <p className="text-gray-500 text-sm">2 hours ago</p>
          </div>
        </div>
        {/* Post Body */}
        <p className="mb-4" data-testid="post-body">
          I am glad to announce my new position at MPC as a Full-Stack Intern.
          Join my discord&apos;s party tonight to celebrate together.
        </p>
        <div className="w-full bg-black flex justify-center mb-4">
          <Image
            src="https://media.licdn.com/dms/image/v2/D4E0BAQG3VBspsd9Bxw/company-logo_200_200/company-logo_200_200/0/1719258422692/mensa_philosophical_circus_logo?e=1742428800&v=beta&t=ikhWiVs11YB3RvQwydWQwXYXNw5CI62Pc01WCr-pQlg"
            alt="Post Image"
            width={200}
            height={200}
          />
        </div>
        <div>
          <LikesCounter />
        </div>
        {/* Features */}
        <Features />
        {/* Comments */}
        <div className="w-full h-[2px] mb-4 bg-white"></div>
        <Comments />
      </div>
      {/* settings control button */}
      <SettingsButton />
    </main>
  );
}
