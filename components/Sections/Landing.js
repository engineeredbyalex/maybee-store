// importing Page
import Page from "../Layout/Page";

export default function Landing() {

  return (
    <Page>
      <div className="w-full h-full flex items-center justify-center">
        <h1 className="text-[#fff] font-bold uppercase text-center absolute left-0 top-[20rem] right-0 bottom-0">
          Lumanari parfumate <br /> produse create cu grijă şi atenţie
        </h1>
        <div className="hero_background" />
      </div>
    </Page>
  );
}
