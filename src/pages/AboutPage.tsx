import panelYelena from "../assets/panel-yelena.jpg";
import panelBerserk from "../assets/panel-berserk.webp";
import panelBleach from "../assets/panel-bleach.jpg";
import panelMiyamoto from "../assets/panel-miyamoto.jpg";
import panelChainsaw from "../assets/panel-chainsaw.webp";

const AboutPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center p-6">
      <strong className="font-bold text-4xl tracking-wider mt-8">WHAT WE OFFER</strong>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 max-w-6xl">
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-xl font-semibold">Premium Quality</h3>
          <p>Experience high-quality prints and durable bindings that make each manga volume a collector's item.</p>
        </div>
        <div className="row-span-2">
          <img src={panelBerserk} alt="Berserk panel" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-xl font-semibold">Immersive Storytelling</h3>
          <p>Delve into captivating stories and complex characters that keep you hooked from the first page to the last.</p>
        </div>
        <div className="row-span-2">
          <img src={panelYelena} alt="Yelena panel" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        <div className="row-span-2">
          <img src={panelChainsaw} alt="Chainsaw Man panel" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        <div className="row-span-2 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Stunning Artwork</h3>
          <p>Marvel at the detailed artwork and unique artistic styles that bring each manga series to life.</p>
          <p>Each panel is meticulously crafted to convey action, emotion, and atmosphere.</p>
          <p>Enjoy illustrations that range from beautifully serene to dynamically intense.</p>
        </div>
        <div className="row-span-2">
          <img src={panelMiyamoto} alt="Miyamoto panel" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-xl font-semibold">Exclusive Features</h3>
          <p>Get access to special edition volumes, author interviews, and behind-the-scenes content.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-xl font-semibold">All in One Experience</h3>
          <p>Enjoy a comprehensive reading experience with detailed annotations and translation notes.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden">
          <img src={panelBleach} alt="Bleach panel" className="w-full h-full object-cover rounded-lg shadow-lg" />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
