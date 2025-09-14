import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Skill from "../components/Skill";
import Project from "../components/Project";


export default function PortfolioPage() {
  return (
    <>
      <div>
        <Navbar />
        <Profile />
        <Skill />
        <Project />
      </div>
    </>
  );
}