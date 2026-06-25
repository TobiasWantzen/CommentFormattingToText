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

![Arcobat screenshot: before and after the script run](https://user-images.githubusercontent.com/7114561/194847127-63414122-b676-485e-ba18-3abeb416b81a.gif "Arcobat: before and after the script run")

![Indesign screenshot: before and after the script run](https://user-images.githubusercontent.com/7114561/194847177-5865c516-faa9-43cb-be7b-e69728c6580f.gif "Indesign: before and after the script run")

**In InDesign** the formatting tags can be searched and corrected after the correction execution either by hand or with GREP.

The following GREP, which finds all possible tags, can serve as a possible starting point:

*GREP Search:* `\{\{([biusbpan\d-]+\}\})(.+?)\{\{/\1\}\}` \
*GREP Replace:* `$2`

This will jump one at a time from one occurrence of the format tags to the next. The GREP only deletes the format tags. As a workflow, steps 1-3 would repeat until no more format tags are found:

1. Jump to the next occurrence.
2. Replace.
3. Apply the correct character style sheet.

## Installation instructions
This Acrobat script will only work when placed in one of the Acrobat `JavaScripts` folders.

*For Windows:*

Install system-wide:
* Place the script file "ToggleCover.js" in this folder (or the same folder in the full version):\
  `C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\Javascripts\`
* Restart Acrobat.

Install in user-specific folder (recommended!):
* Place the script file "ToggleCover.js" in this folder (or the same folder in the full version):\
  `C:\Users\[YourUsername]\AppData\Roaming\Adobe\Acrobat\Privileged\DC\JavaScripts`
  (Alternatively, without the "Privileged" folder: `...\Adobe\Acrobat\DC\JavaScripts`)
* Restart Acrobat.

(Tip: The AppData folder is hidden by default in Windows. You can simply type `%appdata%` into the address bar of the Windows Explorer and press Enter to jump straight into the Roaming folder.)

*For Mac:*

Install system-wide:
* In Finder, go to your Acrobat.app in the Applications folder.
* Right-click on the Acrobat.app and select "View Package Contents" to view the inside of the app package.
* Inside the app navigate to this directory:\
  `Acrobat.app/Contents/Resources/JavaScripts/`
* Place the script file "ToggleCover.js" there.
* Restart Acrobat.

Install in user-specific folder (recommended!):
* In Finder navigate to this directory:\
  `~/Library/Application Support/Adobe/Acrobat/DC/JavaScripts/`
* Place the script file "ToggleCover.js" there.
* Restart Acrobat.

Tip: The Library folder is hidden by default on Mac. In Finder, click on Go in the top menu bar, hold down the Option/Alt key (⌥), and the `Library` entry will appear in the drop-down menu.

If this does not work, you can find out the directory on your computer as follows:

* Key Ctrl+J (Windows) or Cmd+J (Mac) to bring up the console.
* Type *one* of the following lines and confirm with Ctrl+Return (Windows) or Command+Return (Mac) or the Enter key of the number pad:

```javascript
app.getPath("app","javascript");
app.getPath("user");
```
This way you will know under which path you can place the script on your computer.

If the folder `JavaScripts` does not exist in your folder structure, simply create it by yourself.

The `user` folder is shared by Acrobat and Acrobat Reader. Scripts installed there are only available to the user. If they are installed in the `application` folder, the scripts are available to all users.



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

![Arcobat-Screenshot: vor und nach dem Scriptlauf](https://user-images.githubusercontent.com/7114561/194847127-63414122-b676-485e-ba18-3abeb416b81a.gif "Arcobat: vor und nach dem Scriptlauf")

![InDesign-Screenshot: vor und nach dem Scriptlauf](https://user-images.githubusercontent.com/7114561/194847177-5865c516-faa9-43cb-be7b-e69728c6580f.gif "InDesign: vor und nach dem Scriptlauf")

**In InDesign** können die Formatierungs-Tags nach der Korrekturausführung entweder von Hand oder per GREP gesucht und korrigiert werden.

Als eine mögliche Basis kann dieser GREP dienen, der alle möglichen Tags findet:

*GREP Search:* `\{\{([biusbpan\d-]+\}\})(.+?)\{\{/\1\}\}` \
*GREP Replace:* `$2`

Damit springen Sie einzeln von einem Vorkommen der Format-Tags zum nächsten. Der GREP löscht lediglich die Format-Tags. Als Arbeitsablauf würden sich die Schritte 1–3 so lange wiederholen bis keine Format-Tags mehr gefunden werden:

1. Springe zum nächsten Vorkommen.
2. Ersetze.
3. Zeichne per Hand mit der korrekten Zeichenstilvorlage aus.

## Installationsanleitung
Dieses Acrobat-Skript funktioniert nur, wenn es in einem der Acrobat `JavaScripts`-Ordner abgelegt wird.

*Für Windows:*

Systemweit installieren:
* Legen Sie die Skriptdatei "ToggleCover.js" in diesem Ordner (oder im entsprechenden Ordner der Vollversion) ab:\
  `C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\Javascripts\`
* Starten Sie Acrobat neu.

Im benutzerspezifischen Ordner installieren (empfohlen!):
* Legen Sie die Skriptdatei "ToggleCover.js" in diesem Ordner (oder im entsprechenden Ordner der Vollversion) ab:\
  `C:\Users\[IhrBenutzername]\AppData\Roaming\Adobe\Acrobat\Privileged\DC\JavaScripts`
  (Alternativ ohne den "Privileged"-Ordner: `...\Adobe\Acrobat\DC\JavaScripts`)
* Starten Sie Acrobat neu.

(Tipp: Der Ordner AppData ist unter Windows standardmäßig ausgeblendet. Sie können einfach `%appdata%` in die Adressleiste des Windows-Explorers eingeben und Enter drücken, um direkt in den Roaming-Ordner zu springen.)

*Für Mac:*

Systemweit installieren:
* Gehen Sie im Finder zu Ihrer Acrobat.app im Ordner "Programme".
* Machen Sie einen Rechtsklick auf die Acrobat.app und wählen Sie "Paketinhalt einblenden", um das Innere des App-Pakets anzuzeigen.
* Navigieren Sie innerhalb der App zu diesem Verzeichnis:\
  `Acrobat.app/Contents/Resources/JavaScripts/`
* Legen Sie die Skriptdatei "ToggleCover.js" dort ab.
* Starten Sie Acrobat neu.

Im benutzerspezifischen Ordner installieren (empfohlen!):
* Navigieren Sie im Finder zu diesem Verzeichnis:\
  `~/Library/Application Support/Adobe/Acrobat/DC/JavaScripts/`
* Legen Sie die Skriptdatei "ToggleCover.js" dort ab.
* Starten Sie Acrobat neu.

Tipp: Der Library-Ordner ist auf dem Mac standardmäßig versteckt. Klicken Sie im Finder im oberen Menü auf "Gehe zu", halten Sie die Option/Alt-Taste (⌥) gedrückt, und der Eintrag `Library` erscheint im Dropdown-Menü.

Wenn das nicht funktioniert, können Sie das Verzeichnis auf Ihrem Computer wie folgt herausfinden:

* Drücken Sie Strg+J (Windows) oder Cmd+J (Mac), um die Konsole zu öffnen.
* Tippen Sie *eine* der folgenden Zeilen ein und bestätigen Sie mit Strg+Enter (Windows) bzw. Cmd+Enter (Mac) oder der Enter-Taste des Ziffernblocks:

```javascript
app.getPath("app","javascript");
app.getPath("user");
