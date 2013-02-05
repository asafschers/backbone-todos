class TagsController < ApplicationController


  def index

    render :json => Tag.all

  end

  def show

    render :json => Tag.find(params[:id])

  end


  def create

    tag = Tag.create! params

    render :json => tag

  end

  def update

    tag = Tag.find(params[:id])

    tag.update_attributes! params

    render :json => tag

  end

  def destroy

    tag = Tag.find(params[:id])

    tag.destroy

    render :json => tag

  end

end
