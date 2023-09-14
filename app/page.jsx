import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover & Share</h1>

      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sequi in
        eos veniam, vero quisquam vitae quo similique nulla inventore repellat
        molestiae rem quaerat ex, nisi expedita magnam dolorum incidunt?
      </p>

      <Feed />
    </section>
  );
};

export default Home;
