# Native UI

Apply this guidance to iOS, iPadOS, and Android screens built with SwiftUI, UIKit, Jetpack Compose, Android Views, React Native, Expo, or Flutter, from the first design step, because platform structure is hard to retrofit. Mobile web, and a native shell around a website, keep the web rules.

## Platform first

The platform's guidelines (Apple Human Interface Guidelines, Material 3) decide structure, navigation, and interaction on every screen, including marketing-style ones. The brand speaks through the layer the platform leaves open: tint, color roles, type, shape, motion, and content.

Default to platform components and depart only for a reason the user would thank you for. The failure is an app that looks ported from a website or from the other platform: reinvented navigation bars, a custom back control, web-shaped buttons, hover-dependent affordances, a web icon set. React Native, Expo, and Flutter leak these habits most, so check there first.

A cross-platform app with one design language still owes each OS its guarantees on that hardware: safe areas, Reduce Motion, and edge-swipe back on iPhone; edge-to-edge insets and system Back on Android.

## iOS and iPadOS

- Lay out inside the safe-area insets, with no controls under the notch, Dynamic Island, home indicator, or rounded corners, and keep inputs clear of the keyboard. SwiftUI does this by default; React Native and Flutter need the insets applied explicitly.
- Use a tab bar for top-level sections, never for actions, with few enough tabs (five or fewer on iPhone) that none overflow into a More tab; a navigation stack for hierarchy; a sheet for a self-contained task. Give top-level screens a large title that collapses inline on scroll (opt-in outside SwiftUI), and keep detail screens inline. On iPad, let the tab bar adapt into a sidebar (`.tabViewStyle(.sidebarAdaptable)`) and use `NavigationSplitView` for list and detail.
- Keep the left-edge swipe-back gesture working. Hiding the system back button to draw a custom one disables it.
- Make every tappable control 44×44 pt, the HIG's default control size, with space between neighbors.
- Set text in the system text styles (Large Title through Caption 2), never fixed point sizes, so it follows Dynamic Type; Body is 17 pt, nothing goes below 11 pt, and layouts reflow rather than clip at accessibility sizes. Body, labels, and controls stay on SF Pro; a brand face appears only in display moments.
- Use semantic colors (`label`, `secondaryLabel`, `systemBackground`, `separator`, the accent color) and give any custom color light, dark, and increased-contrast variants, because raw hex breaks in Dark Mode and Increase Contrast. Keep color in controls and navigation sparing, and design the dark appearance as its own scheme, not an inversion.
- Liquid Glass (iOS 26 and later; apps linked against the iOS 27 SDK can no longer opt out): standard bars, sheets, popovers, and controls adopt it automatically. Remove custom backgrounds from navigation bars, tab bars, toolbars, and split views so they do not fight the material and the scroll edge effect. Give glass to a custom control only through the system glass button styles or `glassEffect`, on the few most important controls and never stacked, and never hand-roll blur or translucency. Test custom elements with Reduce Transparency, Increase Contrast, and Reduce Motion on.
- Use platform controls: toggles, segmented controls, steppers, system pickers, menus, confirmation dialogs, alerts, context menus, swipe actions. Use SF Symbols for icons. Show settings-shaped content as grouped or inset lists rather than stacks of cards.
- Present a focused, dismissible sub-task as a sheet with clear Cancel and Done, and immersion as a full-screen cover. Allow swipe-to-dismiss; block it and confirm only when dismissal would lose entered data.
- Keep system transitions: push slides in, sheets rise, dismissal reverses the entrance. When Reduce Motion is on (`accessibilityReduceMotion`), replace parallax, zooms, and large slides with a crossfade.

## Android

- Match navigation to window width: a navigation bar with 3–5 destinations at compact width and a navigation rail at medium and expanded widths; Compose's `NavigationSuiteScaffold` switches between them. Material 3 Expressive deprecates the navigation drawer in favor of the expanded navigation rail. Never ship the phone bar unchanged on a tablet.
- Keep system Back working, gesture and button, and never trap the user. For apps targeting API 36 on Android 16, predictive back animations are on by default, `onBackPressed` is no longer called, and `KEYCODE_BACK` is no longer dispatched, so handle back with `OnBackPressedCallback` (Views) or `BackHandler` and `PredictiveBackHandler` (Compose).
- Draw edge-to-edge and apply the status bar, navigation bar, display cutout, and IME insets (in Compose, the `Scaffold` content padding, `WindowInsets.safeDrawing`, `imePadding`), so nothing hides behind system bars or the keyboard. Edge-to-edge is enforced from API 35, the opt-out is disabled at API 36, and Google Play requires API 36 for new apps and updates from 31 August 2026.
- Use a top app bar for screen context and at most one FAB, only for the screen's single primary action.
- Make every touch target at least 48×48 dp, with at least 8 dp between targets.
- Map text to the Material type scale (Display, Headline, Title, Body, Label, each large, medium, small) through `MaterialTheme.typography`, in sp, never px or dp, so it follows the system font size. Roboto is the system face; theme a brand face in through the scale.
- Use Material color roles (`primary`, `onPrimary`, `secondaryContainer`, `surface`, `outline`, `error`), never raw hex. Show elevation with the surface container roles (`surfaceContainerLowest` through `surfaceContainerHighest`), which replaced the tinted elevation overlay, and shadow only where the component calls for it. Use Dynamic Color on Android 12 and later where it fits, always with a static fallback scheme, and design the dark theme as its own scheme.
- Use Material components: filled, tonal, outlined, and text buttons, FAB, switches, chips, bottom sheets, dialogs, navigation bar and rail. Show transient feedback in a snackbar, with an action when useful, rather than a toast, and use dialogs only for decisions that must interrupt.
- Use Material transition patterns (container transform, shared axis, fade through). When the user turns animations off (Remove animations, animator scale 0, or battery saver), custom animation code checks `ValueAnimator.areAnimatorsEnabled()` and falls back to a crossfade or an instant cut.

## Adaptive layout

Drive structure from size classes (iOS) and window size classes (Android), never from the device model or idiom, because iPad multitasking and Android multi-window hand a phone-width window to a tablet. At tablet widths, restructure instead of stretching: list and detail side by side, multi-column grids, popovers where phones use sheets.

Restructure for landscape rather than clipping or letterboxing, and lock orientation only when the task demands it, never to dodge a layout bug. Android 16 ignores orientation, resizability, and aspect-ratio restrictions on displays at least 600dp in smallest width for apps targeting API 36, and the temporary opt-out ends at API 37, so large-screen layouts must work at every size and orientation and keep UI state across the extra recreations. On foldables, respond to posture and hinge through window size classes and test folded, unfolded, and tabletop.

## Porting

Translate idioms instead of transplanting them, and carry the brand through the target's theming:

| iOS | Android |
|---|---|
| Tab bar, sidebar | Navigation bar, navigation rail |
| Edge-swipe back, back chevron | System Back with predictive back |
| Toggle, segmented control, system pickers | Material switch, segmented buttons or chips, Material pickers |
| Action sheet, confirmation dialog | Bottom sheet, Material dialog |
| SF Symbols, SF Pro, Dynamic Type | Material Symbols, Roboto, sp |
| Semantic colors, Liquid Glass | Color roles, surface containers |
| Push and sheet transitions | Container transform, shared axis, fade through |

To bring a website to native, reconform rather than reflow: the platform's navigation, platform controls instead of HTML-shaped ones, touch-first affordances instead of hover, Dynamic Type or sp instead of px.

## Verify

Take screenshots from a simulator, emulator, or device, never a browser:

- iOS: `xcrun simctl io booted screenshot <path>`; with several simulators running, use the UDID from `xcrun simctl list devices booted` instead of `booted`. Switch to dark with `xcrun simctl ui booted appearance dark`, and check a large accessibility text size for truncation.
- Android: `adb exec-out screencap -p > <path>`, adding `-s <serial>` to every command when several devices are attached. Switch to dark with `adb shell cmd uimode night yes`, and check `adb shell settings put system font_scale 1.3`, restoring `1.0` afterward.

Cover every device class the app ships to: at least one phone and, when targeted, one tablet per platform, in both orientations and split screen. Simulators and emulators give breadth; posture, gestures, refresh rate, and performance need hardware, so say which one produced each piece of evidence.
