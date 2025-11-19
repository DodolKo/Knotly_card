# Knotly - Linktree-like PWA

## Project Overview

Knotly is a **Progressive Web App (PWA)** that functions as a customizable link-in-bio platform, similar to Linktree. It's built as a **Single Page Application (SPA)** using React and TypeScript.

## Key Features

### Customization via JSON
- The app uses a **JSON file format** to store and manage:
  - **Custom data**: User profile information, links, and content
  - **Custom styling**: Theme, colors, and visual appearance

### User Customization
- **Customizable App Name**: Users can personalize the app name to match their username/pseudo
- **Multiple Link Cards**: Users can create and manage multiple link cards, each with its own:
  - Title
  - URL
  - Custom styling
  - Display order

## Technical Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Architecture**: Single Page Application (SPA)
- **Data Format**: JSON-based configuration
- **Target**: Progressive Web App (PWA) for mobile and desktop

## Project Structure
- Configuration data is stored in `public/data/user.json`
- The app reads from JSON files to dynamically render content and apply styles

## Goal
Create an easy-to-use, customizable link aggregation platform where users can showcase multiple links in a single, personalized page that matches their brand identity.



