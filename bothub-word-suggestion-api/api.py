from gensim.models import KeyedVectors
from flask import Flask
from flask import request
from flask import jsonify
from waitress import serve


app = Flask(__name__)
model = None


@app.route("/v1/get_similars", methods=['POST'])
def test_model_api():
    try:
        sentence = request.get_data()
        sentence = str(sentence.decode('utf-8'))
        response = model.most_similar(sentence)

        data = []
        for i in response:
            data.append({'sentence': i[0], 'similarity': i[1]})

        response = jsonify({'text': data})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except KeyError:
        response = jsonify({'error': ''})
        response.status_code = 204
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


def setup_model():
    global model
    print("Loading model...")
    model = KeyedVectors.load_word2vec_format("word2vec.vec", binary=False)


def main():
    setup_model()
    serve(app, host='0.0.0.0', port=5000)
    # app.run(debug=False)


if __name__ == '__main__':
    main()
