import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LivreService} from "../../_services/livre.service";
import {Livre} from "../../_models/livre";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Auteur} from "../../_models/auteur";

declare var window: any;

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})

export class LivreComponent implements OnInit {
  id!: string;
  ListLivre: Livre[] | null = null;
   ListAuteur: Array<Auteur> |null = null;
  livre: Livre = {};
  formGroup!: FormGroup;
  formModal: any;
  formModal2: any;


  constructor(private matSnackBar: MatSnackBar, public dialog: MatDialog, private livreService: LivreService, private fb: FormBuilder) {
  }

  ngOnInit(): void {


    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.formModal2 = new window.bootstrap.Modal(
      document.getElementById('myModal2')
    );

    this.formGroup = this.fb.group({
      titre: [this.livre.titre, Validators.required],
      isbn: [this.livre.isbn, Validators.required],
      pages: [this.livre.pages, Validators.required],
      anneedition: [this.livre.anneedition, Validators.required],
      prix: [this.livre.prix, Validators.required],
      resume: [this.livre.resume, Validators.required],
    })

    this.livreService.getAllivres().subscribe(value => {
      this.ListLivre = value;
    })
  }

  getLivreById(id: any) {
    this.formModal.show();

    this.livreService.getivreById(id).subscribe(value => {
      this.livre = value;

      this.formGroup = this.fb.group({
        titre: [this.livre.titre, Validators.required],
        isbn: [this.livre.isbn, Validators.required],
        pages: [this.livre.pages, Validators.required],
        anneedition: [this.livre.anneedition, Validators.required],
        prix: [this.livre.prix, Validators.required],
        resume: [this.livre.resume, Validators.required],
      })
    })
  }


  Suppression() {
    if (confirm("êtes-vous sur de vouloir supprimer")) {


      let id = this.livre.idLivre;
      this.livreService.DeliteLivreById(id).subscribe(value => {
        this.formModal.hide();
        this.formGroup.reset();
        this.ngOnInit()
        this.matSnackBar.open("la Suppression a été effectuée avec succès", "Suppression!", {
          duration: 2000,
          horizontalPosition: "center",
          direction: "rtl"
        });
      });
    }
  }

  modification() {
    if (this.formGroup.valid) {
      let id = this.livre.idLivre;
      this.livre = this.formGroup.value;
      this.livre.idLivre = id;
      this.livreService.UpdateLivre(this.livre).subscribe(value => {
        this.formModal.hide();
        this.formGroup.reset();
        this.ngOnInit();
        this.matSnackBar.open("la modification a été effectuée avec succès", "modification!", {
          duration: 2000,
          horizontalPosition: "center",
          direction: "rtl"
        });
      });
    }

  }

  Auteur(livre: Livre) {
    // @ts-ignore
    this.ListAuteur=livre.auteurs;
    console.log(this.ListAuteur)
    this.formModal2.show();

   }
}

