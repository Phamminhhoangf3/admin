interface IAuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 inset-y-0 overflow-hidden bg-indigo-50">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white"></div>
      </div>
      <div className="relative w-screen h-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto lg:px-12">
          <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 md:mt-auto md:h-screen">
              <div
                className="bg-white rounded-2xl shadow-xl w-full sm:w-96"
                style={{
                  maxWidth: "calc(100vw - 5rem)",
                  padding: "2.375rem 1rem 3rem",
                }}
              >
                <div className="p-4 space-y-4 md:space-y-6 md:p-5">
                  {children}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
