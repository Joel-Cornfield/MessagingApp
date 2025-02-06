export interface userProps {
  _id: string | undefined;
  avatarUrl: string | undefined; 
  username: string | undefined;
  email: string | undefined;
  messages: any[];
  createdAt: Date;
}

export interface ChatListProps {
  reverse(): any;
  filter(arg0: (arg: any) => any): any;
  map(arg0: (user: any) => React.JSX.Element): React.ReactNode;
  _id: string | undefined;
  avatarUrl: string | undefined; 
  name: string | undefined;
  email: string | undefined;
}

export interface selectedUserState {
  selectedUser: undefined | any;
  setSelectedUser: (user: any) => void;
}

export interface userState {
  myUser: undefined | any;
  setUser: (user: any) => void;
}

export interface AvatarProps {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void; 
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      MONGODB_URI: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string; // Added Cloudinary env variable
      NEXT_PUBLIC_CLOUDINARY_API_KEY: string; // Added Cloudinary API key
      NEXT_PUBLIC_CLOUDINARY_API_SECRET: string; // Added Cloudinary API secret
    }
  }
}
