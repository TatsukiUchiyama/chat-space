class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string  :image
      t.text    :body
      t.integer :user, foreign_key: true
      t.integer :group, foreign_key: true
      t.timestamps
    end
  end
end
