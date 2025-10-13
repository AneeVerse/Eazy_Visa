# Temporarily Hidden Elements Documentation

This document tracks all elements that have been temporarily hidden (commented out) in the codebase for development purposes.

## Last Updated
Date: January 13, 2025

## Hidden Elements

### 1. Navbar - Dummy Bookings Link
**File:** `src/components/Layout/Navbar.jsx`
**Line:** ~62
**What was hidden:** "Dummy Bookings" navigation link
**Code:**
```javascript
// {name: "Dummy Bookings", href: "/dummy-bookings"}, // TEMPORARILY HIDDEN
```
**Reason:** Temporary removal from main navigation

### 2. Visa Services Mega Menu - Dummy Flights
**File:** `src/components/Layout/Navbar.jsx`
**Lines:** ~38-47
**What was hidden:** Dummy Flights service from mega menu
**Code:**
```javascript
// TEMPORARILY HIDDEN - Dummy Flights
// {
//   id: 4,
//   title: "Dummy Flights",
//   url: "/dummy-flights",
//   description: "Verifiable flight tickets for visa applications",
//   image: "/images/home/dummy-flight.webp",
//   rating: 4.9,
//   size: "large",
// },
```
**Reason:** Temporary removal from visa services menu

### 3. Visa Services Mega Menu - Dummy Hotel
**File:** `src/components/Layout/Navbar.jsx`
**Lines:** ~48-57
**What was hidden:** Dummy Hotel service from mega menu
**Code:**
```javascript
// TEMPORARILY HIDDEN - Dummy Hotel
// {
//   id: 5,
//   title: "Dummy Hotel",
//   url: "/dummy-hotel",
//   description: "Verifiable hotel booking for visa applications",
//   image: "/images/home/dummy-hotel.webp",
//   rating: 4.6,
//   size: "large",
// },
```
**Reason:** Temporary removal from visa services menu

## How to Restore

To restore any of these elements:
1. Navigate to the specified file
2. Find the commented section
3. Remove the comment markers (`//` or `/* */`)
4. Save the file

## Notes
- All hidden elements are marked with "TEMPORARILY HIDDEN" comments for easy identification
- The original functionality remains intact and can be restored by uncommenting
- No files were deleted, only commented out for temporary hiding