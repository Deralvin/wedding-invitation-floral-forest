import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  Timestamp,
} from "firebase/firestore";

export interface RSVPRecord {
  id?: string;
  guestName: string;
  attendance: "ATTENDING" | "DECLINED";
  guestCount: number;
  dietaryRestrictions?: string;
  createdAt: Timestamp | { seconds: number; nanoseconds: number } | Date;
}

export interface WishRecord {
  id?: string;
  guestName: string;
  message: string;
  relationshipTag?: string;
  createdAt: Timestamp | { seconds: number; nanoseconds: number } | Date;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const hasValidConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== "undefined"
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (hasValidConfig) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (err) {
    console.warn("Firestore initialization error, using local fallback:", err);
  }
}

// Initial sample wishes for offline / immediate beautiful display
const INITIAL_MOCK_WISHES: WishRecord[] = [
  {
    id: "sample-1",
    guestName: "Dimas & Citra",
    message: "Selamat menempuh babak baru Aruna & Bian! Semoga senantiasa rukun, bertabur berkah, dan bahagia hingga akhir hayat di surga-Nya.",
    relationshipTag: "Sahabat",
    createdAt: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "sample-2",
    guestName: "Om Herman & Keluarga",
    message: "Baarakallahu laka wa baaraka 'alaika wa jama'a bainakuma fii khoir. Selamat melangkah bersama, saling memuliakan dan menguatkan.",
    relationshipTag: "Keluarga",
    createdAt: new Date(Date.now() - 3600000 * 5),
  },
  {
    id: "sample-3",
    guestName: "Nadia Rahma",
    message: "MasyaAllah terharu sekali akhirnya hari ini tiba. Pasangan yang saling melengkapi dan hangat. Happy wedding kalian berdua!",
    relationshipTag: "Teman Kuliah",
    createdAt: new Date(Date.now() - 3600000 * 8),
  },
];

const LOCAL_STORAGE_WISHES_KEY = "floral_forest_wishes_cache";
const LOCAL_STORAGE_RSVP_KEY = "floral_forest_rsvp_cache";

function getLocalWishes(): WishRecord[] {
  if (typeof window === "undefined") return INITIAL_MOCK_WISHES;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_WISHES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(INITIAL_MOCK_WISHES));
      return INITIAL_MOCK_WISHES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_WISHES;
  }
}

function saveLocalWish(wish: WishRecord) {
  if (typeof window === "undefined") return;
  try {
    const current = getLocalWishes();
    const updated = [wish, ...current];
    localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("local-wishes-updated"));
  } catch (e) {
    console.error("Local wish save failed", e);
  }
}

export async function submitRSVP(data: {
  guestName: string;
  attendance: "ATTENDING" | "DECLINED";
  guestCount: number;
  dietaryRestrictions?: string;
}): Promise<{ success: boolean; id?: string }> {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "rsvps"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn("Firestore submitRSVP error, fallback local:", err);
    }
  }

  // Local fallback
  if (typeof window !== "undefined") {
    try {
      const prev = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RSVP_KEY) || "[]");
      prev.push({ ...data, createdAt: new Date() });
      localStorage.setItem(LOCAL_STORAGE_RSVP_KEY, JSON.stringify(prev));
    } catch {
      // ignore
    }
  }
  return { success: true, id: `local-rsvp-${Date.now()}` };
}

export async function submitWish(data: {
  guestName: string;
  message: string;
  relationshipTag?: string;
}): Promise<{ success: boolean; id?: string }> {
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "wishes"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.warn("Firestore submitWish error, fallback local:", err);
    }
  }

  // Local fallback
  const newWish: WishRecord = {
    id: `local-wish-${Date.now()}`,
    guestName: data.guestName,
    message: data.message,
    relationshipTag: data.relationshipTag || "Tamu Undangan",
    createdAt: new Date(),
  };
  saveLocalWish(newWish);
  return { success: true, id: newWish.id };
}

export function subscribeWishes(
  callback: (wishes: WishRecord[]) => void
): () => void {
  if (db) {
    try {
      const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));
      return onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const items: WishRecord[] = snapshot.docs.map((doc) => {
              const d = doc.data();
              return {
                id: doc.id,
                guestName: d.guestName || "Anonim",
                message: d.message || "",
                relationshipTag: d.relationshipTag || "Tamu",
                createdAt: d.createdAt || new Date(),
              };
            });
            callback(items);
          } else {
            // If collection empty in firestore, show sample
            callback(INITIAL_MOCK_WISHES);
          }
        },
        (err) => {
          console.warn("Wishes onSnapshot error, fallback local listener:", err);
          callback(getLocalWishes());
        }
      );
    } catch (err) {
      console.warn("Firestore subscribe exception:", err);
    }
  }

  // Local storage listener fallback
  callback(getLocalWishes());
  const handleLocalUpdate = () => {
    callback(getLocalWishes());
  };
  if (typeof window !== "undefined") {
    window.addEventListener("local-wishes-updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);
  }
  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("local-wishes-updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    }
  };
}
