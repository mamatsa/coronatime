# Coronatime

Coronatime is a website where you can register/login and then view covid statistics by country or worldwide summed up data.

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Resources](#resources)

#

### Prerequisites

- <img src="./readme/assets/node.svg" height="17" style="position: relative; top: 2px"/> _Node JS @12.X and up_

* <img src="./readme/assets/npm.png" height="16" style="position: relative; top: 4px"> _npm @6 and up_

#

### Tech Stack

- <img src="readme/assets/react.png" height="18" style="position: relative; top: 4px" /> [React @18.1.0](https://reactjs.org) - Front-end framework
- <img src="readme/assets/typescript.png" height="20" style="position: relative; top: 4px" /> [Typescript @4.7.2](https://www.typescriptlang.org/) - Superset of Javascript
- <img src="readme/assets/tailwind.png"  height="20" style="position: relative; top: 4px" /> [TailwindCss @3.0.24](https://tailwindcss.com/) - CSS framework
- <img src="readme/assets/router.webp" height="11" /> [React Router @6.3.0](https://reactrouter.com/) - Client side router
- <img src="readme/assets/react-form.png" height="18" style="position: relative; top: 4px" /> [React Hook Form @7.31.3](https://react-hook-form.com/) - Form validation library
- <img src="readme/assets/cypress.png" height="18" style="position: relative; top: 4px" /> [Cypress @10.0.3](https://www.cypress.io/) - JS testing tool
- <img src="readme/assets/i18next.png" height="18" style="position: relative; top: 4px" /> [I18next @21.8.8](https://www.i18next.com/) - JS language changing tool

#

### Getting Started

**To run this application locally you need to follow the steps below:**

1\. First of all you need to clone repository from github:

```sh
git clone https://github.com/RedberryInternship/coronatime-otomamatsashvili.git
```

2\. Next step requires installing all the dependencies:

```sh
npm install
```

or

```sh
yarn install
```

3\. Then copy env example file. You can change environment variables inside .env with your preferences:

```sh
cp .env.example .env
```

4\. After that you can run Coronatime from terminal:

```sh
npm start
```

or

```
yarn run start
```

5\. You can also build project for production if you need to:

```sh
npm run build
```

#

### Testing

This application is test driven. To write e2e and integration tests `@cypress` is used. You can find all of the tests into following path: `/cypress/e2e/*.cy.ts`

You can run cypress tests using following commands:

1\. Copy cypress configuration file and if you need feel free to change it:

```sh
cp cypress.config.ts.example cypress.config.ts
```

2\. Open cypress:

```sh
npx cypress open
```

#

### Project Structure

**Every file is not included**

```bash
├─── cypress # test files
│   ├─── e2e      # all e2e tests
│   ├─── support  # library configuration files
├─── public  # entry folder
├───├─── locales # translation files
│   ├─── index.html     # main html file
├─── readme  # readme assets
├─── src  # project source codes
│   ├─── assets      # project images
│   ├─── components  # reusable components for whole app
│   ├─── pages  # application pages
│   ├───├─── page-folder  # pattern for each application page
│   ├───├───├─── page-component-file.tsx  # page component file
│   ├───├───├─── index.ts                 # exports page
│   ├───├───├─── page-components-folder   # [OPTIONAL] stores page specific components
│   ├───├─── index.ts  # exports all pages
│   ├─── services  # backend request files
│   ├─── types     # type files
│   ├─── App.tsx   # main component with routing
│   ├─── app.css   # main css file
│   ├─── index.tsx # root TS file
│   ├─── i18n.ts   # i18n configuration
├─── .env                # environment variables
├─── .eslintrc.json      # eslint config file
├─── .prettierrc.js      # prettier config file
├─── package.json        # dependency manager configurations
├─── cypress.config.ts   # cypress config file
├─── tailwind.config.js  # tailwind config file
```

#

### Deployment

**Application is deployed on digitalocean server with `ngnix`. You can view it [here](https://coronatime.otar.redberryinternship.ge/)**

If you want to deploy this application on your own:

1\. You need to copy env example file on server. You should update env variables with your needs:

```sh
cp .env.example .env
```

2\. And then just build:

```sh
npm run build
```

#

### Resources

- [Application Design [Figma]](https://www.figma.com/file/O9A950iYrHgZHtBuCtNSY8/Coronatime?node-id=0%3A1)
- [Back End API Specification](https://coronatime-api.devtest.ge/)
- [Git Commits Structure](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
