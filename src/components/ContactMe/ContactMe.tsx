function ContactMe(): JSX.Element {
  return (
    <section className="flex w-full max-w-md flex-col">
      {/*BOTÃO DE NOME*/}
      <div className="my-2 mx-auto flex    w-10/12  items-center justify-center rounded-md border border-[2px] shadow-md">
        <button
          type="submit"
          className="flex h-12 w-12 items-center justify-center rounded-l-md border border-white bg-gray-100 text-white "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-900"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="w-full">
          <input
            type="search"
            x-model="input1"
            className="h-12 w-full rounded-r-md border border-gray-100 px-4 py-1 text-gray-800 focus:outline-none"
            placeholder="Nome"
          />
        </div>
      </div>

      {/* PHONE*/}
      <div className="my-2 mx-auto flex w-10/12  items-center justify-center rounded-md border border-[2px] shadow-md">
        <div>
          <button
            type="submit"
            className="flex h-12 w-12 items-center justify-center rounded-l-md border border-white bg-gray-100 text-white "
            // :class="(search.length > 0) ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'"
            // :disabled="search.length == 0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
        </div>

        <div className="  w-full">
          <input
            type="search"
            x-model="input2"
            className="h-12 w-full rounded-r-md border border-gray-100 px-4 py-1 text-gray-800 focus:outline-none"
            placeholder="Celular"
          />
        </div>
      </div>

      {/* ASSUNTO */}
      <div className="my-2 mx-auto flex w-10/12  items-center justify-center rounded-md border border-[2px] shadow-md">
        <textarea
          x-model="input3"
          className="w-full rounded-r-md border border-gray-100 px-4 py-1 text-gray-800 focus:outline-none"
          placeholder="Assunto"
          rows={6}
        ></textarea>
      </div>

      {/* BOTÃO ENVIAR EMAIL */}
      <div className="flex justify-center">
        <button className="mt-4 inline-flex w-56 items-center justify-center rounded border-b-2 border-green-500 bg-white py-2 px-6 font-bold text-gray-800 shadow-md hover:border-green-600 hover:bg-green-500 hover:text-white">
          <span className="mr-2">Enviar email</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentcolor"
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default ContactMe;
