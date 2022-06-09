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
yarn
```

3\. After that you can run Coronatime e from terminal:

```sh
npm start
```

or

```
yarn run start
```

#

### Testing

This application is test driven. To write e2e and integration tests `@cypress` is used. You can find all of the tests into following path: `/cypress/integration/*.spec.js`

You can run cypress tests using following commands:

1\. Copy cypress configuration file and if you need feel free to change it:

```sh
cp cypress.config.example.ts cypress.config.ts
```

2\. Open cypress:

```sh
npx cypress open
```

#

### Project Structure

```bash
├─── cypress # test files
│   ├─── e2e      # all e2e tests
│   ├─── support  # library configuration files
├─── public  # entry folder
├───├─── locales # translation files
|   ├───├─── en
|   ├───├───├─── translation.json # english translation
|   ├───├─── geo
|   ├───├───├─── translation.json # georgian translation
│   ├─── favicon.png    # tab icon
│   ├─── index.html     # main html file
│   ├─── manifest.json  # index.html configurations
│   ├─── robots.txt     # search optimization
├─── readme  # readme assets
├─── src  # project source codes
│   ├─── assets      # project images
│   ├─── components  # reusable components
│   ├───├─── svg                  # svg files as react components
│   ├───├─── AuthNavbar.tsx       # navbar for login/register and related pages
│   ├───├─── Button.tsx           # main button
│   ├───├─── Input.tsx            # input with its error handling
│   ├───├─── LanguageChanger.tsx  # language select
│   ├───├─── index.ts  # exports components
│   ├─── pages  # application pages
│   ├───├─── Login
│   ├───├───├─── Login.tsx  # login page
│   ├───├───├─── index.ts   # exports page
│   ├───├─── Register
│   ├───├───├─── Register.tsx  # registration page
│   ├───├───├─── index.ts      # exports page
│   ├───├─── RequestResetPassword
│   ├───├───├─── RequestResetPassword.tsx  # request password reset for specific email
│   ├───├───├─── index.ts                  # exports page
│   ├───├─── ResetPassword
│   ├───├───├─── ResetPassword.tsx  # sets new password
│   ├───├───├─── index.ts           # exports page
│   ├───├─── Confirmation
│   ├───├───├─── Confirmation.tsx  # combines auth related pending and confirmation pages
│   ├───├───├─── index.ts          # exports page
│   ├───├─── Dashboard
│   ├───├───├─── components  # components for dashboard
│   ├───├───├───├─── svg  # dashboard svgs
│   ├───├───├───├─── WorldwideStatistics.tsx  #  dashboard part of worldwide statistics
│   ├───├───├───├─── CountryStatistics.tsx    #  statistics by country
│   ├───├───├───├─── StatisticSwitch.tsx      #  navbar for statistics
│   ├───├───├───├─── Navbar.tsx               #  main dashboard navbar
│   ├───├───├───├─── MobileSlidebar.tsx       #  navbar for mobile
│   ├───├───├───├─── index.ts                 #  exports dashboard components
│   ├───├───├─── Dashboard.jsx  # covid statistics
│   ├───├───├─── index.ts       # exports dashboard
│   ├───├─── index.ts  # export all pages
│   ├─── App.tsx  # main component with routing
│   ├─── app.css  # main css file
│   ├─── index.ts # root TS file
├─── .eslintrc.json      # eslint config file
├─── .prettierrc.js      # prettier config file
├─── package.json        # dependency manager configurations
├─── cypress.config.ts        # cypress config file
├─── tailwind.config.js  # tailwind config file
|
```

#

### Deployment

Application is deployed on digitalocean server with `ngnix`. You can view it [here](coronatime.otar.redberryinternship.ge).

#

### Resources

- [Application Design [Figma]](https://www.figma.com/file/O9A950iYrHgZHtBuCtNSY8/Coronatime?node-id=0%3A1)
- [Back End API Specification](https://coronatime-api.devtest.ge/)
- [Git Commits Structure](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
