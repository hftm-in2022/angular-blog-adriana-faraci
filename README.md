
# Angular Projekt Setup mit ESLint, Prettier, Environments, Commitlint, lint-staged und Husky

Dieses README beschreibt, wie Sie ein Angular-Projekt einrichten und verschiedene Tools wie ESLint, Prettier, Environments, Commitlint, lint-staged und Husky integrieren, um die Codequalität sicherzustellen und einen sauberen Entwicklungsprozess zu gewährleisten.

## Inhaltsverzeichnis
1. [Angular Projekt erstellen](#angular-projekt-erstellen)
2. [ESLint in der Angular-Anwendung hinzufügen](#eslint-in-der-angular-anwendung-hinzufügen)
3. [Prettier installieren und konfigurieren](#prettier-installieren-und-konfigurieren)
4. [Environments für Angular generieren](#environments-für-angular-generieren)
5. [Commitlint einrichten](#commitlint-einrichten)
6. [lint-staged einrichten](#lint-staged-einrichten)
7. [Husky einrichten](#husky-einrichten)

## Angular Projekt erstellen

Um ein neues Angular-Projekt zu erstellen, führen Sie den folgenden Befehl aus:

```bash
ng new mein-angular-projekt
```

Folgen Sie den Anweisungen im Terminal, um das Projekt nach Ihren Wünschen zu konfigurieren. Navigieren Sie anschließend in das erstellte Projektverzeichnis:

```bash
cd mein-angular-projekt
```

Nun können Sie mit der Einrichtung der verschiedenen Tools beginnen.

## 1. ESLint in der Angular-Anwendung hinzufügen

ESLint ist ein Tool zur statischen Codeanalyse, das hilft, potenzielle Fehler zu finden und den Code konsistent zu halten.

Führen Sie folgenden Befehl aus, um ESLint zu Ihrem Angular-Projekt hinzuzufügen:

```bash
ng add @angular-eslint/schematics
```

> **Hinweis**: Weitere Informationen zur Integration von ESLint in Angular finden Sie in diesem [Artikel: How to Add ESLint to an Angular Application](https://angular.io).

## 2. Prettier installieren und konfigurieren

Prettier ist ein Code-Formatter, der Ihren Code automatisch gemäß definierten Stilregeln formatiert.

Installieren Sie Prettier als Entwicklungsabhängigkeit:

```bash
npm install prettier --save-dev
```

Fügen Sie das folgende Skript zur `package.json` hinzu, um den Code innerhalb des `src/app`-Ordners zu formatieren:

```json
"scripts": {
  "format": "npx prettier --write ./src/app/*"
}
```

## 3. Environments für Angular generieren

Environments werden in Angular verwendet, um verschiedene Konfigurationsoptionen für unterschiedliche Umgebungen (z. B. Entwicklung, Produktion) zu definieren.

Generieren Sie die Umgebungskonfigurationsdateien:

```bash
ng generate environments
```

> Weitere Informationen finden Sie in der offiziellen Dokumentation: [Angular Build Guide](https://angular.io/guide/build).

## 4. Commitlint einrichten

Commitlint sorgt dafür, dass Ihre Commit-Nachrichten einem konventionellen Format folgen.

Installieren Sie Commitlint und die konventionelle Konfiguration:

```bash
npm install @commitlint/cli @commitlint/config-conventional
```

Fügen Sie die folgende Konfiguration zur `package.json` hinzu:

```json
"commitlint": {
  "extends": [
    "@commitlint/config-conventional"
  ]
}
```

> Weitere Informationen finden Sie unter [Commitlint](https://commitlint.js.org/).

## 5. lint-staged einrichten

lint-staged ermöglicht es, Lintern und Formatierungs-Tools nur auf die geänderten Dateien anzuwenden, was den Commit-Prozess beschleunigt.

Installieren Sie lint-staged als Entwicklungsabhängigkeit:

```bash
npm install --save-dev lint-staged
```

Fügen Sie die folgende Konfiguration zur `package.json` hinzu:

```json
"lint-staged": {
  "*.{ts,js,html}": "eslint --cache --fix",
  "*.{ts,js,html,css,scss,less,md}": "prettier --write"
}
```

> Weitere Informationen finden Sie unter [lint-staged](https://github.com/okonet/lint-staged).

## 6. Husky einrichten

Husky ermöglicht es, Git-Hooks einfach zu verwalten und auszuführen, z.B. um automatisch Prettier und ESLint vor jedem Commit auszuführen.

Installieren Sie Husky:

```bash
npm install --save-dev husky
```

Initialisieren Sie Husky:

```bash
npx husky init
```

Fügen Sie das folgende Skript zur `package.json` hinzu, um Husky vorzubereiten:

```json
"scripts": {
  "prepare": "husky install"
}
```

Führen Sie das vorbereitende Skript aus:

```bash
npm run prepare
```

Erstellen Sie den Commit-Hook für Commitlint:

```bash
echo 'npx --no-install commitlint --edit "$1"' > .husky/commit-msg
```

Erstellen Sie den Pre-Commit-Hook für lint-staged:

```bash
echo 'npx --no-install lint-staged' > .husky/pre-commit
```

> Weitere Informationen zu Husky finden Sie auf [GitHub](https://github.com/typicode/husky).

---

Mit diesen Schritten haben Sie Ihr Angular-Projekt erfolgreich mit ESLint, Prettier, Environments, Commitlint, lint-staged und Husky eingerichtet. Dies stellt sicher, dass Ihr Code sauber, gut formatiert und konsistent bleibt.
