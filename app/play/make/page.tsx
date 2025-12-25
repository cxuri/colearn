import GameSettings from "@/components/game/GameSettings";

export const metadata = {
  title: 'Klaz Runner',
  description: 'Play my custom level on Klaz Runner!',
  openGraph: {
    title: 'Klaz Christmas Challenge ❄️',
    description: 'This Christmas, slow down for a moment. Play and enjoy!',
    images: ['/christmas_card.jpeg'], 
  },
}

export default function AdminPage() {
  return <GameSettings />;
}