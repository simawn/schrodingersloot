# 🐱 Schrodinger's Loot 📦

# Try it out!
https://simonhuang.ca/schrodingersloot/

# Inspiration
Who doesn't love opening mystery boxes?

I've been working as a visual effects artist before coming into CS and I wanted to see if I can merge some of my animation skills with code. I've always wondered how some website have those beautiful animation on their page without having it as a video. Turns out one solution was developed by AirBnb (Lottie) and I wanted to try out.

# What it does
You open boxes; you either get a cat or poison.

Collect all the cats! Collect all the poison!

Don't worry, there are no dead cats 😸

# How I built it
There is no back-end interaction so it was build entirely out of HTML, CSS, and Javascript. All the animations were animated in Adobe After Effects then exported with BodyMovin plugin which converts the animation data into .json files. AirBnb's Lottie library was used to load those .json animations into the web.

# Challenges I ran into
The BodyMovin plugin and Lottie library restrict the power of After Effects. I was limited to using regular shapes and cannot use animation effects that would have made the process much easier. I also had to make sure that my compositions were simple enough so that it gets exported into .json file without any problems.

# Accomplishments that I'm proud of
I'm a back-end developer and tend to avoid front-end like a plague. I'm proud of what the animations turned out with that short amount of time. Of course, I will be improving them in the future.

# What I learned
How to use Javascript to add elements to the DOM. Also, how useful BodyMovin and Lottie can be when building interactive applications.

# What's next for Schrodinger's Loot
Microtransactions.

Just kidding.

Due to time constraints, there were many features that I couldn't implement properly. Here's a list of potential features:

- Better interface
- More cats, items, and boxes
- Trading ability with other 'players'
