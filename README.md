# Calendar Event Scheduling App

## Project Overview

The Calendar Event Scheduling App is a mobile scheduling application that allows users to create, manage, and repeat events on specific dates. Designed for seamless operation across all Expo-supported platforms (iOS, Android, and Web), this app provides an intuitive and efficient way to keep track of your schedule.

## Features

- **Event Creation:**

  - Create new events by entering an event name, setting a time, and selecting a repeat option.
  - Repeat options available:
    - **Weekly:** The event recurs every week.
    - **Bi-weekly:** The event recurs every other week.
    - **Monthly:** The event recurs every month.
  - Users must click the "Save" button to confirm event creation.

- **Event Management:**

  - **Edit Events:** Modify the name, time, or repeat option of existing events.
  - **Delete Events:** Remove events by clicking the delete button.

- **Event Display & Restrictions:**
  - Dates with scheduled events are visually highlighted.
  - Past events can be viewed but cannot be created or modified.
  - Overlapping events (conflicting time slots) are not permitted.

## Technology Stack

- **React Native (Expo):** For building cross-platform mobile apps (iOS, Android, and Web).
- **State Management:** Redux with Redux Toolkit and Redux Persist.
- **Routing & Navigation:** Expo Router and React Navigation.
- **Styling:** Tailwind CSS with NativeWind.
- **Additional Libraries:** Includes utilities like date-fns, formik, lodash, and various Expo modules (vector icons, splash screen, etc.).
- **Testing & Linting:** Jest, ESLint, and TypeScript.

## Installation Instructions

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <project_directory>
```

### 2. Install Dependencies

After cloning the repository, install the project dependencies using your preferred package manager.

- **npm**
- **pnpm**
- **yarn**
- **bun**

```bash
   bun install
```

### 3. Running the Application

Start the application by running:

```bash
   bun run start
```

### Platform-specific Commands

Depending on the target platform, use the following flags:

- For iOS:

```bash
   bun run start --ios
```

- For Android:

```bash
   bun run start --android
```

- For Web:

```bash
   bun run start --web
```
