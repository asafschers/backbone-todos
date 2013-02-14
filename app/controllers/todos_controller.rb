class TodosController < ApplicationController

  def index

      render :json => Todo.all

    end

    def show

      render :json => Todo.find(params[:id])

    end

    def create

      todo = Todo.create! params

      render :json => todo

    end

    def update

      todo = Todo.find(params[:id])

      submission_hash = {"done" => params[:done],
                         "content" => params[:content]}

      #todo.update_attributes! params[:todo]
      todo.update_attributes! submission_hash

      #todo.update_attributes! params

      logger.debug "todo attributes hash: #{todo.attributes.inspect}"


      render :json => todo

    end

    def destroy

     todo = Todo.find(params[:id])

     todo.destroy

     render :json => todo

   end

end
