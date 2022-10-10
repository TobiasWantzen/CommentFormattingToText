# CommentFormattingToText.js [EN]

Acrobat DC script for tagging all rich-text formattings in comments before importing the comments to the InDesign comments panel. (Does not run with Acrobat Reader!)

## How to use
* Open your PDF file with comments.
* Start the script via "Tools" &rarr; "Add-ons" &rarr; "Tag Comment Formatting".
* Save PDF.
* Import PDF comments into InDesign with the comments panel.

## Logic
The script tags all formatting in comments with the following tagging system:
|tag|meaning|
|:---|:---|
|`i`|italic|
|`b`|bold|
|`u`|underline|
|`s`|strikethrough|
|`sub`|subscript|
|`sup`|superscript|

- For better recognizability the tags are enclosed in doubled curly braces, e.g. {{i}}text in italic{{/i}}.
- Multiple formattings are tied together, separated with a "-", e.g. {{b-i}}text in bold and italic{{/b-i}}.
- If the font-weight is not 400 (= regular), the weight will be added to the b tag (700 = bold will not output a number), e.g. `{{b600}}text in medium{{/b600}}`, `{{b}}text in bold{{/b}}`.

![acrobat-vorher-nachher-1-768x365](https://user-images.githubusercontent.com/7114561/194847127-63414122-b676-485e-ba18-3abeb416b81a.gif)

**In InDesign** the formatting tags can be searched and corrected after the correction execution either by hand or with GREP.

![indesign-vorher-nachher-768x365](https://user-images.githubusercontent.com/7114561/194847177-5865c516-faa9-43cb-be7b-e69728c6580f.gif)

The following GREP can serve as a possible starting point:

*GREP Search:* `\{\{([biusbpan\d-]+\}\})(.+)\{\{/\1`
*GREP Replace:* `$2`

This will jump one at a time from one occurrence of the format tags to the next. The GREP only deletes the format tags. As a workflow, steps 1-3 would repeat until no more format tags are found:

1. Jump to the next occurrence.
2. Replace.
3. Draw by hand with the correct character style sheet.

## General installation instructions
This Acrobat script will only work when placed in one of the Acrobat JavaScript folders.

*For Windows:*

* Place the script file "ToggleCover.js" in this folder (or the same folder in the full version):\
  `C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\Javascripts\`
* Restart Acrobat.

*For Mac:*

* In Finder, go to your Acrobat.app in the Applications folder.
* Right-click on the Acrobat.app and select "View Package Contents" to view the inside of the app package.
* Inside the app navigate to this directory:\
  `Acrobat.app/Contents/Resources/JavaScripts/`
* Place the script file "ToggleCover.js" there.
* Restart Acrobat.

If this does not work, you can find out the directory on your computer as follows:

* Key Ctrl+J (Windows) or Cmd+J (Mac) to bring up the console.
* Type *one* of the following lines and confirm with Ctrl+Return (Windows) or Command+Return (Mac) or the Enter key of the number pad:

```javascript
app.getPath("app","javascript");
app.getPath("user");
```
This way you will know under which path you can place the script on your computer. In the user folder you may have to create the folder "JavaScripts".

The "user" folder is shared by Acrobat and Acrobat Reader. Scripts installed there are only available to the user. If they are installed in the "application" folder, the scripts are available to all users.



# CommentFormattingToText.js [DE]

Acrobat-DC-Script, das alle Formatierungen in PDF-Kommentaren vor dem Import in das InDesign-»PDF-Kommentare«-Panel mit Tags auszeichnet. (Läuft nicht mit Acrobat Reader!)

## Anwendung
* Öffnen Sie das PDF mit den Kommentaren.
* Starten Sie das Script via "Werkzeuge" &rarr; "Add-ons/Zusatzprogramme" &rarr; "Formatierte Kommentare auszeichnen".
* Speichern Sie das PDF.
* Importieren Sie die PDF-Kommentare nach InDesign mit dem »PDF-Kommentare«-Panel.

## Logik
Dieses Skript zeichnet alle Formatierungen in den Kommentaren nach dem folgenden System aus:
|Tag|Bedeutung|
|:---|:---|
|`i`|kursiv (italic)|
|`b`|halbfett (bold)|
|`u`|unterstrichen (underline)|
|`s`|durchgestrichen (strikethrough)|
|`sub`|tiefgestellt (subscript)|
|`sup`|hochgestellt (superscript)|

- Die Tags werden zur besseren Sichtbarkeit in doppelt-geschweifte Klammern gehuellt, z.B. {{i}}Text in kursiv{{/i}}.
- Mehrfachauszeichnungen werden durch ein "-" getrennt zusammengehaengt, z.B. {{b-i}}Text in halbfett and kursiv{{/b-i}}.
- Wenn der Fettungsgrad der Schrift nicht 400 (= regular) ist, wird der Fettungsgrad an das b-Tag angefuegt (700 = halbfett/bold wird nicht nummerisch ausgegeben), z.B. `{{b600}}Text in viertelfett/semi-bold{{/b600}}`, `{{b}}Text in halbfett/bold{{/b}}`.

![acrobat-vorher-nachher-1-768x365](https://user-images.githubusercontent.com/7114561/194847127-63414122-b676-485e-ba18-3abeb416b81a.gif)

**In InDesign** können die Formatierungs-Tags nach der Korrekturausführung entweder von Hand oder per GREP gesucht und korrigiert werden.

![indesign-vorher-nachher-768x365](https://user-images.githubusercontent.com/7114561/194847177-5865c516-faa9-43cb-be7b-e69728c6580f.gif)

Als eine mögliche Basis kann dieser GREP dienen:

*GREP Search:* `\{\{([biusbpan\d-]+\}\})(.+)\{\{/\1`
*GREP Replace:* `$2`

Damit springen Sie einzeln von einem Vorkommen der Format-Tags zum nächsten. Der GREP löscht lediglich die Format-Tags. Als Arbeitsablauf würden sich die Schritte 1–3 so lange wiederholen bis keine Format-Tags mehr gefunden werden:

1. Springe zum nächsten Vorkommen.
2. Ersetze.
3. Zeichne per Hand mit der korrekten Zeichenstilvorlage aus.

## Installationsanleitung
Das Script funktioniert nur, wenn Sie es in einem der Acrobat-JavaScript-Ordner platzieren:

*Für Windows:*

* Legen Sie die Scriptdatei "ToggleCover.js" in diesen Ordner:\
  `C:\Programme (x86)\Adobe\Acrobat DC\Reader\Javascripts\`
* Starten Sie Acrobat neu.

*Für Mac:*

* Gehen Sie im Finder zu Ihrer Acrobat.app im Programme-Ordner.
* Klicken Sie mit der rechten Maustaste auf die Acrobat.app und wählen Sie »Paketinhalt anzeigen«, um das Innere der Applikation anzuzeigen.
* Navigieren Sie innerhalb der App in das Verzeichnis:\
  `Acrobat.app/Contents/Resources/JavaScripts/`
* Platzieren Sie die Scriptdatei "ToggleCover.js" dort
* Starten Sie Acrobat neu.

Sollte das nicht funktionieren, können Sie das Verzeichnis auf Ihrem Rechner wie folgt ermitteln:

* Tasten Sie Ctrl+J (Windows) bzw. Cmd+J (Mac), um die Konsole aufzurufen.
* Tippen Sie *eine* der folgenden Zeilen ein und bestätigen Sie mit Strg+Return (Windows) bzw. Befehl+Return (Mac) oder der Enter-Taste des Nummernfelds:

```javascript
app.getPath("app","javascript");
app.getPath("user");
```
Auf diese Weise erfahren Sie, unter welchem Pfad Sie das Script auf Ihrem Rechner ablegen können. Im user-Ordner müssen Sie evtl. den Ordner „JavaScripts“ noch neu anlegen.

Den »user«-Ordner teilen sich übrigens Acrobat und Acrobat Reader. Dort installierte Scripte stehen ausschließlich dem User selbst zur Verfügung. Bei einer Installation im »application«-Ordner stehen die Scripte allen Usern zur Verfügung.
