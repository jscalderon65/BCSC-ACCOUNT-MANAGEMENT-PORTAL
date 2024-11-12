import IndexHeader from "@components/IndexHeader";
import IndexContent from "@components/IndexContent";
import IndexFooter from "@components/IndexFooter";

export default function Home() {
  return (
    <div className="main-container">
      <IndexHeader />
      <IndexContent />
      <IndexFooter />
    </div>
  );
}
