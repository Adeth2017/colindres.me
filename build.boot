(set-env!
 :source-paths #{"src" "content"}
 :exclusions   '[[org.clojure/clojure]]
 :dependencies '[[org.clojure/clojure "1.9.0-alpha17"]
                 [hiccup              "1.0.5"]
                 [pandeiro/boot-http  "0.8.3"]
                 [perun               "0.4.2-SNAPSHOT"]
                 [slugify             "0.0.1"]])

(require '[io.perun           :refer :all]
         '[pandeiro.boot-http :refer [serve]])

;; Courtesy http://seancorfield.github.io/blog/2016/06/17/more-boot/
(deftask check-conflicts
  "Verify there are no dependency conflicts."
  []
  (with-pass-thru fs
    (require '[boot.pedantic :as pedant])
    (let [dep-conflicts (resolve 'pedant/dep-conflicts)]
      (if-let [conflicts (not-empty (dep-conflicts (get-env)))]
        (throw (ex-info (str "Unresolved dependency conflicts. "
                             "Use :exclusions to resolve them!")
                        conflicts))
        (println "No dependency conflicts.")))))

(deftask build
  "Build the website."
  []
  (comp (markdown)
        (draft)
        (permalink :permalink-fn 'me.colindres.core/permalink)
        (ttr)
        (word-count)
        (render :renderer 'me.colindres.core/page)))

(deftask start
  "Build the website and serve it up on PORT. Watch and re-build on changes."
  [p port PORT int "Web-server port. Defaults to 4565"]
  (let [port (or port 4565)]
    (comp (check-conflicts)
          (notify)
          (watch)
          (build)
          (serve :port port :resource-root "public"))))
