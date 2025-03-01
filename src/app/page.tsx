import UploadImage from "./components/UploadImage";
import HistoryUpload from "./components/history-upload";
import Tagline from "./components/Tagline";


export default function Home() {


  return (
    <div className="mt-[120px] mb-[20px]">
      {/* tagline */}
      <Tagline/>

      {/* upload */}
      <UploadImage/>

      {/* history */}
      <HistoryUpload/>
     
    </div>
  );
}
