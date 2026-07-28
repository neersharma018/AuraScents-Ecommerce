import re

with open("d:/Web Projects/E commerce store/src/index.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. :root variables
css = re.sub(
    r":root \{.*?\n\}",
    """:root {
  --bg: #F8F5F0;
  --bg-2: #EFEBE3;
  --bg-3: #E5DFC8;
  --gold: #C09A4D;
  --gold-bright: #D4AF37;
  --gold-soft: #A37F38;
  --gold-deep: #8B6914;
  --ivory: #1A1A1A;
  --ivory-soft: rgba(26, 26, 26, 0.75);
  --ivory-dim: rgba(26, 26, 26, 0.45);
  --border-gold: rgba(192, 154, 77, 0.3);
  --border-gold-strong: rgba(192, 154, 77, 0.6);
  --glass: rgba(255, 255, 255, 0.6);
}""",
    css,
    flags=re.DOTALL
)

# 2. glass-card
css = css.replace("background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));", 
                  "background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3));\n  box-shadow: 0 8px 32px rgba(0,0,0,0.03);")

# 3. chip
css = css.replace("background: rgba(255,255,255,0.02);", "background: rgba(255,255,255,0.6);")

# 4. navbar
css = css.replace("background: rgba(11, 11, 11, 0.75);", "background: rgba(248, 245, 240, 0.85);")
css = css.replace("background: rgba(11, 11, 11, 0);", "background: rgba(248, 245, 240, 0);")

# 5. collection-card & product-card
css = css.replace("background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005));", 
                  "background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3));")
css = css.replace("background: linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005));", 
                  "background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3));")

css = css.replace("box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 50px rgba(212, 175, 55, 0.18);",
                  "box-shadow: 0 30px 60px rgba(0,0,0,0.06), 0 0 50px rgba(192, 154, 77, 0.1);")
css = css.replace("box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(212, 175, 55, 0.1);",
                  "box-shadow: 0 20px 50px rgba(0,0,0,0.05), 0 0 40px rgba(192, 154, 77, 0.1);")

# 6. silk-bg
css = css.replace("linear-gradient(180deg, #0B0B0B 0%, #1A120B 50%, #0B0B0B 100%);",
                  "linear-gradient(180deg, #F8F5F0 0%, #EFEBE3 50%, #F8F5F0 100%);")
css = css.replace("linear-gradient(180deg, #1A120B 0%, #0B0B0B 100%);",
                  "linear-gradient(180deg, #EFEBE3 0%, #F8F5F0 100%);")

# 7. insta-item
css = css.replace("background: linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(11, 11, 11, 0.5));",
                  "background: linear-gradient(135deg, rgba(192, 154, 77, 0.2), rgba(248, 245, 240, 0.3));")
css = css.replace("color: var(--ivory);", "color: #1A1A1A;")

# 8. mobile-menu & search overlay
css = css.replace("background: rgba(11, 11, 11, 0.95);", "background: rgba(248, 245, 240, 0.95);")

# 9. toast
css = css.replace("background: linear-gradient(135deg, rgba(26, 18, 11, 0.95), rgba(11, 11, 11, 0.95));",
                  "background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 245, 240, 0.95));")
css = css.replace("box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.2);",
                  "box-shadow: 0 10px 40px rgba(0,0,0,0.08), 0 0 20px rgba(192, 154, 77, 0.15);")

# 10. input
css = css.replace("background: rgba(255,255,255,0.03);", "background: rgba(255,255,255,0.6);")
css = css.replace("background: rgba(212, 175, 55, 0.05);", "background: rgba(255,255,255,0.9);")

# 11. marquee
css = css.replace("background: rgba(255,255,255,0.015);", "background: rgba(255,255,255,0.4);")

# Write changes
with open("d:/Web Projects/E commerce store/src/index.css", "w", encoding="utf-8") as f:
    f.write(css)
