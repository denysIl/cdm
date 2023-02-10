from search.models import Article, Insight
import csv, codecs
from io import StringIO

class UnicodeReader:
    """
    A CSV reader which will iterate over lines in the CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        f = codecs.utf_8_decode(f)
        self.reader = csv.reader(f, dialect=dialect, **kwds)

    def next(self):
        row = self.reader.next()
        return [unicode(s, "utf-8") for s in row]

    def __iter__(self):
        return self

def run():
    articles_path = "../articles.csv"
    insights_path = "../insights.csv"
    with open(articles_path, encoding="utf-8-sig") as f:
            reader = csv.reader(f)

            Article.objects.all().delete()

            for row in reader:
                _, created = Article.objects.get_or_create(
                    id=row[0],
                    title=row[1],
                    authors=row[2],
                    year=row[3],
                    citation=row[4],
                    keywords=row[5],
                    tags=row[6],
                    abstract=row[7],
                    ai_abstract=row[8],
                    )
                # creates a tuple of the new object or
                # current object and a boolean of if it was created


    with open(insights_path, encoding="utf-8-sig") as f:
            reader = csv.reader(f)

            Insight.objects.all().delete()

            for row in reader:
                _, created = Insight.objects.get_or_create(
                    id=row[0],
                    text=row[1],
                    source=row[2],
                    keywords=row[3],
                    paraphrased=row[4],
                    location=row[5],
                    )
                # creates a tuple of the new object or
                # current object and a boolean
                # of if it was created