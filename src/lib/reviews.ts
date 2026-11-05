/* ─── Google reviews shown on the site ───
   Hand-picked from Jessica's Google Business Profile. Text is copied word for
   word; names are shortened to first name + last initial. To feature a new
   review, add it here and bump REVIEW_COUNT to the total shown on Google. */

export const REVIEW_RATING = 5.0;
export const REVIEW_COUNT = 20;

// Opens Google's "write a review" box for the listing
export const LEAVE_REVIEW_URL = "https://g.page/r/CTuusnucLdBMEBM/review";
// Opens the listing on Google Maps, where all reviews are visible
export const ALL_REVIEWS_URL = "https://www.google.com/maps?cid=5534974092151795259";

export type Review = {
  name: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Randy T.",
    text: "Jessica took the time to understand what I was dealing with and developed a treatment plan that really made a difference. She explained everything clearly, answered all my questions, and made sure I felt comfortable every step of the way. I’ve seen real improvement in my back and overall mobility, and I’m extremely grateful for all of her help. Highly recommend Jessica, she is very talented.",
  },
  {
    name: "Brigid F.",
    text: "Jessica was amazing to work with! From the beginning, she personalized her approach to my needs and focused on helping me achieve the goals that I had set. I've been active in some way since I was 8 years old (I'm now 36) and Jessica still taught me new things when it came to fitness and taking care of my body. Although my knee injury from last year had set me way back, with Jessica's help, I've come farther in the last 2 months than I had in the previous 6.",
  },
  {
    name: "Spencer S.",
    text: "Jessica is the best! She was able to help me identify the cause of chronic pain and then treated it within a few months. She's knowledgeable, helpful, and caring. You can't go wrong with her.",
  },
  {
    name: "Paul S.",
    text: "Jessica did an awesome job finding my weak spots for marathon training and showing me exactly how to do the exercises to fix them. What really stood out was how she took the time to use visuals so I could fully understand everything. I was super impressed and will definitely be back in the future!  I was so impressed with her skill and knowledge!",
  },
  {
    name: "Nancy R.",
    text: "I started with Jessica years ago when I had foot and knee issues. She knew I wanted to keep playing sports and get stronger and I did. I now have hip issues. Again, with her help, I’m recovering so well. She makes sure I’m getting stronger but safely. I absolutely trust her. Smart, kind, knowledgable and empathetic. Just what you want.",
  },
  {
    name: "Brocklyn B.",
    text: "I would highly recommend Jessica to anyone. She is incredibly knowledgeable and consistently goes above and beyond to help you get better. Her detailed, whole-body approach makes you feel truly seen and cared for, and she takes the time to explain the why behind everything she does. She is one of the easiest people to talk to—always encouraging, supportive, and genuinely humble. I look forward to every session and always leave feeling more confident and motivated. She is an exceptional physical therapist and an even better person to be around and learn from! :)",
  },
];
