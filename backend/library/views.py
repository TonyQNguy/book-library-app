import json
from django.views.decorators.csrf import csrf_exempt # type: ignore
from django.http import JsonResponse, HttpResponseNotAllowed # type: ignore
from .models import Book


@csrf_exempt
def book_handler(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        book = Book.objects.create(
            title=data['title'], 
            author=data['author'], 
            genre=data['genre'], 
            publication_date=data['publication_date']
        )

        return JsonResponse({'id': book.id, 'title': book.title, 'author' :book.author, 'genre': book.genre, 'publication_date': str(book.publication_date)}, status=201)
        
    elif request.method == 'GET':
        books = Book.objects.all().values()
        return JsonResponse(list(books), safe=False)

    else:
        return JsonResponse({'error': 'Invalid book ID'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def book_detail_handler(request, book_id):
    try:
        book = Book.objects.get(pk=book_id)
    except Book.DoesNotExist:
        return JsonResponse({'error': "Book not found"}, status=404)
    
    if request.method == 'GET':
        return JsonResponse({
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'genre': book.genre,
            'publication_date': str(book.publication_date),
        })
    
    elif request.method == 'PUT':
        # Extract book_id from URL parameter
        if book_id is not None:
            try:
                data = json.loads(request.body)
                book = Book.objects.get(id=book_id)  # Get book by its ID from URL
                book.title = data['title']
                book.author = data['author']
                book.genre = data['genre']
                book.publication_date = data['publication_date']  # Correct the key name
                book.save()
                return JsonResponse({'message': 'Book updated successfully'})
            except Book.DoesNotExist:
                return JsonResponse({'error': 'Book not found'}, status=404)
    
    elif request.method == 'DELETE':
        book.delete()
        return JsonResponse({'message': "Book deleted successfully"})
    
    return HttpResponseNotAllowed(["DELETE"])