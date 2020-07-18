Rails.application.routes.draw do
  get "posts", to: "posts#index"
  get "posts/new", tp: "posts/new"
  post "posts/", to: "posts#create"
end
