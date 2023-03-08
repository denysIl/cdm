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
    data_path = "../exported.csv"
    data_path_unique = "../exported_unique_source.csv"
    #text,paraphrased,id,authors,title,source,abstract,year,tags,Number (from Linked Issues)
    with open(data_path, encoding="utf-8-sig") as f:
            reader = csv.reader(f)

            Article.objects.all().delete()
            added = []
            for i, row in enumerate(reader):
                if row[5] not in added:
                    added.append(row[5])
                    _, created = Article.objects.get_or_create(
                        id=row[5],
                        title=row[4],
                        authors=row[3],
                        year=row[7],
                        citation='',
                        tags=row[8],
                        abstract=row[6],
                        ai_abstract='',
                        )
                    print(row[5])
                # creates a tuple of the new object or
                # current object and a boolean of if it was created


    with open(data_path, encoding="utf-8-sig") as f:
            reader = csv.reader(f)

            Insight.objects.all().delete()

            for row in reader:
                _, created = Insight.objects.get_or_create(
                    id=row[2],
                    text=row[0],
                    source=row[5],
                    paraphrased=row[1],
                    location=''
                    )
                print(row[2])
                # creates a tuple of the new object or
                # current object and a boolean
                # of if it was created