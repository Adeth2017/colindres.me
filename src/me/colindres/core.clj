(ns me.colindres.core
  (:require [clojure.string :as string]
            [hiccup.page    :as hp]
            [io.perun.core  :as perun]
            [slugify.core   :refer [slugify]]))

(defn page [data]
  (hp/html5
   [:div {:style "max-width: 900px; margin: 40px auto;"}
    (-> data :entry :content)]))

(defn permalink [global-meta m]
  (slugify (:tile m)))
