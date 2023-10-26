import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

load_dotenv()

UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
UNSPLASH_URL = os.getenv("UNSPLASH_URL")


@app.route("/new-image")
def new_image():
    query = request.args.get("query")
    if not query:
        return "Missing query", 400
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_ACCESS_KEY,
    }
    params = {"query": query}
    response = requests.get(UNSPLASH_URL, headers=headers, params=params)
    return response.json()


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        images = images_collection.find({})
        return jsonify(list(images))
    elif request.method == "POST":
        print("POST /images")
        image = request.get_json()
        print(image)
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}, 201
    else:
        return "Method not allowed", 405


@app.route("/images/<image_id>", methods=["DELETE"])
def delete_image(image_id):
    if request.method == "DELETE":
        images_collection.delete_one({"_id": image_id})
        return {"deleted_id": image_id}, 200
    else:
        return "Method not allowed", 405
