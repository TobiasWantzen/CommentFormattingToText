////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Title EN: Tag Comment Formatting  [Acrobat Standard or Acrobat Reader]
// Title DE: Formatierung in Kommentaren auszeichnen  [Acrobat Standard oder Acrobat Reader]
//
// Author: Tobias Wantzen | wantzen.com
// Copyright: 2021, Tobias Wantzen | wantzen.com
// Version: v1.0
//
// Liability disclaimer EN: The author takes no liability for using this script in any way. Use at your own risk.
// Liability disclaimer DE: Jedwede Haftung bei Nutzung des Skripts ist ausgeschlossen. Nutzung auf eigene Gefahr.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  EN:
//  USAGE INSTRUCTIONS:
//
//  The script tags all formatting in comments with the following tagging system:
//  
//  i:   italic
//  b:   bold
//  u:   underline
//  s:   strikethrough
//  sub: subscript
//  sup: superscript
//  
//  - For a better recognizability the tags are enclosed in doubled curly braces, e.g. {{i}}text in italic{{/i}}.
//  - Multiple formattings are tied together, separated with a "-", e.g. {{b-i}}text in bold and italic{{/b-i}}.
//  - If the font-weight is not 700 (= bold), the weight will be added to the b tag (400 = regular is ignored), e.g. {{b600}}text in medium{{/b600}}.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  DE:
//  NUTZUNGSHINWEISE:
//
//  Dieses Skript zeichnet alle Formatierungen in den Kommentaren nach dem folgenden System aus:
//  
//  i:   kursiv (italic)
//  b:   halbfett (bold)
//  u:   unterstrichen (underline)
//  s:   durchgestrichen (strikethrough)
//  sub: tiefgestellt (subscript)
//  sup: hochgestellt (superscript)
//  
//  - Die Tags werden zur besseren Sichtbarkeit in doppelt-geschweifte Klammern gehuellt, z.B. {{i}}Text in kursiv{{/i}}.
//  - Mehrfachauszeichnungen werden durch ein "-" getrennt zusammengehaengt, z.B. {{b-i}}Text in halbfett and kursiv{{/b-i}}.
//  - Wenn der Fettungsgrad der Schrift nicht 700 (= halbfett/bold) ist, wird der Fettungsgrad an das b-Tag angefuegt (400 = normal/regular wird ignoriert), z.B. {{b600}}Text in viertelfett/semi-bold{{/b600}}.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  EN:
//  INSTALLATION:
//
//  This Acrobat Script will only work when placed 
//  in one of the Acrobat JavaScript Folders. 
//  Execute the following code from the Acrobat JavaScript Console
//  to find the location of the JavaScript folders:
//
//      app.getPath("user","javascript");
//      app.getPath("app","javascript");
//
//  To display the Acrobat JavaScript Console use Ctrl+J on Windows
//  and Command+J on the Mac (might not work properly on newer Mac Books).
//
//  You may place this script file in either one of the folders and restart Acrobat.
//  However, the "user" folder is shared by both Acrobat and Reader.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  DE:
//  INSTALLATION:
//
//  Dieses Acrobat-Skript ist nur verfügbar, wenn es in einem der
//  Acrobat-JavaScript-Ordner platziert wird. 
//  Fuehren Sie den nachfolgenden Code in der Acrobat-JavaScript-Console aus,
//  um den JavaScript-Ordner auf Ihrem Rechner zu finden: 
//
//      app.getPath("user","javascript");
//      app.getPath("app","javascript");
//
//  Um die Acrobat-JavaScript-Console anzuzeigen, nutzen Sie den Tastaturbefehl
//  Ctrl+J auf Windows und Command+J auf dem Mac (auf neueren Mac Books kann es sein,
//  dass der Befehl nicht funktioniert).
//
//  Platzieren Sie dieses Skript in einem der Ordner und starten Sie Acrobat neu.
//  Den "user"-Ordner teilen sich Acrobat und Arcobat Reader.
//



////////////////
// localization
var appLang = app.language;



/////////
// logic
var twaCommentFormatting2Text = app.trustedFunction(function() {
    app.beginPriv();
    
    var myDoc = this;

	var twa_TEXTnoDoc = { ENU: "Please open a document.", DEU: "Bitte \u00F6ffnen Sie ein Dokument." };
    if(!myDoc) {
        app.alert(twa_TEXTnoDoc[appLang]);
        return -1;
    }

    function processComments(myDoc) {
        var tagDelimStart = "{{";
        var tagDelimEnd = "}}";
        
        // get list of comments
        var commentList = myDoc.getAnnots();
        
		if (commentList == null) {
            var twa_TEXTnoComments = { ENU: "No comments in active document.", DEU: "Keine Kommentare im aktiven Dokument enthalten." };
			app.alert(twa_TEXTnoComments[appLang]);
			return "noComments";
		}

        // iterate through the comment list
        var nothingChangedAtAll = true;
        for (n = 0; n < commentList.length; n++) {
            var comment = commentList[n];
			if (comment == null) {
				continue;
			}
            if (typeof comment.richContents != "undefined") {
                var spans = new Array;
                var nothingChanged = true;
                for (var i = 0; i < comment.richContents.length; i++) {
                    span = comment.richContents[i];
                    var tagName = "";
                    if (typeof span.fontWeight != "undefined" && span.fontWeight != "400") {
                        if (span.fontWeight == "700") {
                            tagName = tagName + "-b";
                        } else {
                            tagName = tagName + "-b" + span.fontWeight;
                        }
                    }
                    if (typeof span.fontStyle != "undefined" && span.fontStyle == "italic") {
                        tagName = tagName + "-i";
                    }
                    if (typeof span.underline != "undefined" && (span.underline == "underline" || span.underline)) {
                        tagName = tagName + "-u";
                    }
                    if (typeof span.strikethrough != "undefined" && (span.strikethrough == "strikethrough" || span.strikethrough)) {
                        tagName = tagName + "-s";
                    }
                    if (typeof span.subscript != "undefined" && (span.subscript == "subscript" || span.subscript)) {
                        tagName = tagName + "-sub";
                    }
                    if (typeof span.superscript != "undefined" && (span.superscript == "subscript" || span.superscript)) {
                        tagName = tagName + "-sup";
                    }
                    if (tagName != "") {
                        tagName = tagDelimStart + tagName.replace(/^-/g,'') + tagDelimEnd;
                        nothingChanged = false;
                        nothingChangedAtAll = false;
                    }
                    span.text = tagName + span.text + tagName.replace(tagDelimStart, tagDelimStart + '/');
                    spans[spans.length] = span;
                }
                if (!nothingChanged) {
                    comment.richContents = spans;
                }
            }
        }
        return nothingChangedAtAll;
    }

    var returnValue;
    returnValue = processComments(myDoc);

    var twa_TEXTexit = { ENU: "No tagging in comments.", DEU: "Keine Auszeichnungen in Kommentaren vorhanden." };
    var twa_TEXTexitWithChanges = { ENU: "Tagging of comment formattings done.", DEU: "Formatierungen in Kommentaren fertig ausgezeichnet." };
    if (returnValue == "noComments") {
        return;
    } else if (returnValue) {
        app.alert (twa_TEXTexit[appLang]);
    } else {
        app.alert (twa_TEXTexitWithChanges[appLang]);
    }
    
    app.endPriv();
});



/////////////////////////
// ui: button in toolbar

var twa_addToolButton_CommentFormatting2Text_cTooltext = { ENU: "This script tags text formatting in comments  so you can see it properly after importing the PDF comments in the InDesign palette.", DEU: "Dieses Skript zeichnet Formatierung in Kommentaren mit Tags aus, sodass sie nach dem Import der PDF-Kommentare in der InDesign-Palette gut sichtbar ist." };
var twa_addToolButton_CommentFormatting2Text_cLabel = { ENU: "Tag Comment Formatting", DEU: "Formatierte Kommentare auszeichnen" };

var iconHexDATA = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDDDDDDFFD3D3D3FFFDFDFDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF6F6F6FFD5D5D5FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7B7B7BFF0E0E0EFF2E2E2EFFF3F3F3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5F5F5FFFFFFFFFFD0D0D0FF1B1B1BFF383838FFF3F3F3FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8F8F8FF050505FF9E9E9EFFECECECFFFEFEFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF4D4D4DFF7C7C7CFFFFFFFFFFFCFCFCFFE3E3E3FF030303FFA8A8A8FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5F5F5FF202020FFD0D0D0FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9F9F9FF000000FFB4B4B4FFFFFFFFFFFFFFFFFFFFFFFFFF2B2B2BFFA1A1A1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF272727FFB8B8B8FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9F9F9FFF161616FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF262626FFB7B7B7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF9F9F9FF000000FFC9C9C9FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF464646FF484848FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF060606FF939393FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF191919FF3E3E3EFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0B0B0BFFABABABFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8F8F8FFF000000FFCCCCCCFFFFFFFFFFFFFFFFFF3F3F3FFF353535FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFB8B8B8FF080808FFFDFDFDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8E8E8EFF060606FFE1E1E1FFFFFFFFFF000000FF838383FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF535353FF313131FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8F8F8FF000000FFCCCCCCFFFFFFFFFFBCBCBCFF000000FF989898FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF171717FF8C8C8CFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDEDEDEFF000000FF707070FFFFFFFFFFFFFFFFFFFFFFFFFFADADADFF000000FFE0E0E0FFFFFFFFFFFFFFFFFFFFFFFFFFD3D3D3FF0D0D0DFFF5F5F5FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF262626FF484848FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF1F1F1FFFB4B4B4FFFFFFFFFFFFFFFFFFFFFFFFFF6F6F6FFF292929FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF181818FFC1C1C1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7F7F7FF222222FFC0C0C0FFFFFFFFFFFFFFFFFFFFFFFFFF222222FF737373FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF282828FFA7A7A7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7F7F7FF0E0E0EFFD8D8D8FFFFFFFFFFFFFFFFFFD9D9D9FF000000FFD9D9D9FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF212121FF9A9A9AFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFEFEFF2F2F2FFF1C1C1CFF575757FFF6F6F6FFE1E1E1FFB0B0B0FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDBDBDBFF444444FF000000FFD2D2D2FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE8E8E8FF6D6D6DFF676767FFF7F7F7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDDDDDDFF5F5F5FFFB8B8B8FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

var oIconCommentFormatting2Text = null; 
oIconCommentFormatting2Text = {count: 0, width: 20, height: 20, read: function(nBytes){return iconHexDATA.slice(this.count, this.count += nBytes);}};
try { app.removeToolButton("twaCommentFormatting2Text"); } catch(e) {}
// try {
    app.addToolButton({
		cName: "twaCommentFormatting2Text",
		cExec: "twaCommentFormatting2Text();",
		cEnable: "event.rc = (app.doc != null)",
		cMarked: "event.rc = false",
		cTooltext: twa_addToolButton_CommentFormatting2Text_cTooltext[appLang],
		oIcon: oIconCommentFormatting2Text,
		nPos: -1,
		cLabel: twa_addToolButton_CommentFormatting2Text_cLabel[appLang]
	});
// } catch(e) {}