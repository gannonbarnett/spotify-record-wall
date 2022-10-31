import math
import requests
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from tqdm import tqdm
import numpy as np
import scipy.misc
import scipy.cluster
from scipy.signal import hilbert

BEBAS = "Bebas-Regular.ttf"

def make_poster(visuals, outfile="out.png", font_name=BEBAS, default_font_size=30, num_w=None):
    if not num_w:
        num_w = math.ceil(math.sqrt(len(visuals)))

    img_size = 300
    caption_h_padding = 3
    caption_h = default_font_size + caption_h_padding * 2
    num_h = len(visuals) // num_w + 1 

    canvas = Image.new('RGB', (num_w*img_size, num_h * img_size + num_h * caption_h))
    draw = ImageDraw.Draw(canvas)
    i = 0
    with tqdm(total=len(visuals)) as pbar:
        for row in range(num_h):
            for col in range(num_w):
                if i >= len(visuals) - 1:
                    continue
                # visual {albulm name, artist, img_url}
                img_url = visuals[i][2]
                r = requests.get(img_url)
                img = Image.open(BytesIO(r.content))
                pos = (col * img_size, row * (img_size + caption_h))
                canvas.paste(img, pos)
                try:
                    albulm_name = visuals[i][0]
                    font_size = default_font_size
                    font = ImageFont.truetype(font_name, font_size)
                    size = draw.textsize(albulm_name, font)
                    while size[0] > img_size:
                        font_size -= 1
                        font = ImageFont.truetype(font_name, font_size)
                        size = draw.textsize(albulm_name, font)
                    draw.text((col * img_size + (img_size - size[0])/2, row * (img_size + caption_h) + img_size + caption_h_padding), visuals[i][0], font=font)
                except Exception as e:
                    print(e)
                    pass 

                i += 1
                pbar.update(i)
    print("Saving output...")
    canvas.save(outfile)

def make_color_sorted_poster(visuals, outfile="out.png", font_name=BEBAS, default_font_size=30, num_w=None):
    if not num_w:
        num_w = math.ceil(math.sqrt(len(visuals)))

    img_size = 300
    caption_h_padding = 3
    caption_h = default_font_size + caption_h_padding * 2
    num_h = len(visuals) // num_w + 1 

    imgs_colors = []

    canvas = Image.new('RGB', (num_w*img_size, num_h * img_size + num_h * caption_h))
    draw = ImageDraw.Draw(canvas)
    i = 0
    with tqdm(total=len(visuals)) as pbar:
        for row in range(num_h):
            for col in range(num_w):
                if i >= len(visuals) - 1:
                    continue
                # visual {albulm name, artist, img_url}
                img_url = visuals[i][2]
                r = requests.get(img_url)
                img = Image.open(BytesIO(r.content))
                print(dominant_color(img))
                imgs_colors.append((dominant_color(img), visuals[i], img))
            i += 1
            pbar.update(i)
    print(imgs_colors)
    imgs_colors.sort(key=lambda rgb_v:rgb_v[0][0])
    print(imgs_colors)

    i = 0
    with tqdm(total=len(imgs_colors)) as pbar:
        for row in range(num_h):
            for col in range(num_w):
                c, visual, img = imgs_colors[i] 
                pos = (col * img_size, row * (img_size + caption_h))
                canvas.paste(img, pos)
                try:
                    albulm_name = visual[0]
                    font_size = default_font_size
                    font = ImageFont.truetype(font_name, font_size)
                    size = draw.textsize(albulm_name, font)
                    while size[0] > img_size:
                        font_size -= 1
                        font = ImageFont.truetype(font_name, font_size)
                        size = draw.textsize(albulm_name, font)
                    draw.text((col * img_size + (img_size - size[0])/2, row * (img_size + caption_h) + img_size + caption_h_padding), visual[0], font=font)
                except Exception as e:
                    print(e)
                    pass 

                i += 1
                pbar.update(i)
    print("Saving output...")
    canvas.save(outfile)

def dominant_color(img):
    #Get colors from image object
    pixels = img.getcolors(300 * 300)
    #Sort them by count number(first element of tuple)
    sorted_pixels = sorted(pixels, key=lambda t: t[0])
    #Get the most frequent color
    dominant_color = sorted_pixels[-1][1]
    return dominant_color

